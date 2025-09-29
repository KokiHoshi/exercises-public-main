export function detectFileType(input) {
    const bytes = toUint8Array(input);
  
    const startsWith = (seq) => {
      if (bytes.length < seq.length) return false;
      for (let i = 0; i < seq.length; i++) {
        if (bytes[i] !== seq[i]) return false;
      }
      return true;
    };
    const readAscii = (offset, len) =>
      String.fromCharCode(...bytes.slice(offset, offset + len));
  
    // PDF: "%PDF-"
    if (startsWith([0x25, 0x50, 0x44, 0x46, 0x2d])) return "PDF";
  
    // ZIP: PK\x03\x04 / PK\x05\x06 / PK\x07\x08
    if (
      startsWith([0x50, 0x4b, 0x03, 0x04]) ||
      startsWith([0x50, 0x4b, 0x05, 0x06]) ||
      startsWith([0x50, 0x4b, 0x07, 0x08])
    ) {
      return "ZIP";
    }
  
    // GIF: "GIF87a" or "GIF89a"
    const sig6 = readAscii(0, 6);
    if (sig6 === "GIF87a" || sig6 === "GIF89a") return "GIF";
  
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (
      startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    ) {
      return "PNG";
    }
  
    return "UNKNOWN";
  }
  
  function toUint8Array(input) {
    if (input instanceof Uint8Array) return input;
    if (input instanceof ArrayBuffer) return new Uint8Array(input);
    throw new TypeError("detectFileType expects Uint8Array or ArrayBuffer");
  }
  