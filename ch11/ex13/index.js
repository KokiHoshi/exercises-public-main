function escapeString(str) {
  let out = '"';
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);

    if (c >= 0xd800 && c <= 0xdbff) {
      const next = i + 1 < str.length ? str.charCodeAt(i + 1) : 0;
      if (next >= 0xdc00 && next <= 0xdfff) {
        out += str[i] + str[i + 1];
        i++;
        continue;
      }
      out += "\\u" + c.toString(16).padStart(4, "0");
      continue;
    }
    if (c >= 0xdc00 && c <= 0xdfff) {
      out += "\\u" + c.toString(16).padStart(4, "0");
      continue;
    }

    if (c === 0x22) {
      out += '\\"';
      continue;
    } // "
    if (c === 0x5c) {
      out += "\\\\";
      continue;
    } // \
    if (c === 0x08) {
      out += "\\b";
      continue;
    }
    if (c === 0x0c) {
      out += "\\f";
      continue;
    }
    if (c === 0x0a) {
      out += "\\n";
      continue;
    }
    if (c === 0x0d) {
      out += "\\r";
      continue;
    }
    if (c === 0x09) {
      out += "\\t";
      continue;
    }

    if (c < 0x20) {
      out += "\\u" + c.toString(16).padStart(4, "0");
      continue;
    }

    out += str[i];
  }
  out += '"';
  return out;
}

export function stringifyJSON(value) {
  if (value === null) return "null";

  const t = typeof value;

  if (t === "number") return Number.isFinite(value) ? String(value) : "null";
  if (t === "boolean") return value ? "true" : "false";
  if (t === "string") return escapeString(value);

  if (Array.isArray(value)) {
    const parts = [];
    for (let i = 0; i < value.length; i++) {
      const v = value[i];
      parts.push(
        v === undefined || typeof v === "function" || typeof v === "symbol"
          ? "null"
          : stringifyJSON(v)
      );
    }
    return `[${parts.join(",")}]`;
  }

  if (t === "object") {
    const parts = [];
    for (const k of Object.keys(value)) {
      const v = value[k];
      if (v === undefined || typeof v === "function" || typeof v === "symbol")
        continue;
      parts.push(`${escapeString(k)}:${stringifyJSON(v)}`);
    }
    return `{${parts.join(",")}}`;
  }

  return undefined;
}
