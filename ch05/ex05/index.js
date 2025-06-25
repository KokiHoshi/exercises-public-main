export function f(obj) {
    const result = {};
  
    for (const key in obj) {
      if (typeof obj[key] === "number" && obj[key] % 2 === 0) {
        result[key] = obj[key];
      }
    }
  
    return result;
  }
  