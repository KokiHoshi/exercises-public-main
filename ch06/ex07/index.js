// assign: オブジェクトのプロパティを別のオブジェクトにコピー
export function assign(target, ...sources) {
    if (target === null || target === undefined) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
  
    const to = Object(target); // target がプリミティブ(オブジェクトではない基本的な値)でもオブジェクトとしてプロパティを追加できるように変換
  
    for (const source of sources) {
      if (source === null || source === undefined) continue;
  
      const from = Object(source);
  
      // 列挙可能な own string プロパティ
      for (const key of Object.keys(from)) {
        to[key] = from[key];
      }
  
      // 列挙可能な own symbol プロパティ
      const symbols = Object.getOwnPropertySymbols(from);
      for (const sym of symbols) {
        const desc = Object.getOwnPropertyDescriptor(from, sym);
        if (desc.enumerable) {
          to[sym] = from[sym];
        }
      }
    }
  
    return to;
  }
  