export function getAllPropertyKeys(obj) {
    const result = [];
  
    // 1. 独自の列挙可・不可な文字列プロパティ
    result.push(...Object.getOwnPropertyNames(obj));
  
    // 2. 独自の Symbol プロパティ
    result.push(...Object.getOwnPropertySymbols(obj));
  
    // 3. 継承された列挙可能プロパティ（自分のは除外）
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) {
        result.push(key);
      }
    }
  
    return result;
  }
  