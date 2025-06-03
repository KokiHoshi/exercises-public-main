export function convertLFtoCRLF(input) {
    return input.replace(/\n/g, '\r\n');
  }
  
  export function convertCRLFtoLF(input) {
    return input.replace(/\r\n/g, '\n');
  }
  