export function escapeStringIfElse(str) {
    let result = "";
  
    for (const ch of str) {
      if (ch === "\0") result += "\\0";
      else if (ch === "\b") result += "\\b";
      else if (ch === "\t") result += "\\t";
      else if (ch === "\n") result += "\\n";
      else if (ch === "\v") result += "\\v";
      else if (ch === "\f") result += "\\f";
      else if (ch === "\r") result += "\\r";
      else if (ch === "\"") result += "\\\"";
      else if (ch === "'") result += "\\'";
      else if (ch === "\\") result += "\\\\";
      else result += ch;
    }
  
    return result;
  }

  export function escapeStringSwitch(str) {
    let result = "";
  
    for (const ch of str) {
      switch (ch) {
        case "\0": result += "\\0"; break;
        case "\b": result += "\\b"; break;
        case "\t": result += "\\t"; break;
        case "\n": result += "\\n"; break;
        case "\v": result += "\\v"; break;
        case "\f": result += "\\f"; break;
        case "\r": result += "\\r"; break;
        case "\"": result += "\\\""; break;
        case "'": result += "\\'"; break;
        case "\\": result += "\\\\"; break;
        default: result += ch;
      }
    }
  
    return result;
  }
  
  