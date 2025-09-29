// ch11/ex14/index.js
export function sortJapanese(arr) {
    return arr.slice().sort((a, b) =>
      a.localeCompare(b, "ja", { sensitivity: "base" })
    );
  }
  
  export function toJapaneseDateString(date) {
    const parts = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
      era: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(date);
  
    const get = (t) => parts.find(p => p.type === t)?.value ?? "";
    const era = get("era");
    const year = Number(get("year"));
    const month = Number(get("month"));
    const day = Number(get("day"));
  
    return `${era}${year}年${month}月${day}日`;
  }
  