// 原則を満たさないコードと原則を満たすコードの例
// 単一責任の原則

// 悪い例：1つのクラスが解析・印刷・保存の3役を持つ
class ReportService {
    generate(data) { /* 解析ロジック */ }
    print(report)   { /* 印刷ロジック */ }
    save(report)    { /* DB保存ロジック */ }
  }

// 良い例：責務ごとに分離
class ReportGenerator { generate(data) { /* 解析 */ } }
class ReportPrinter   { print(report)  { /* 印刷 */ } }
class ReportRepository{ save(report)   { /* 保存 */ } }

// 連携は組み合わせ側で行う
function run(data, { gen, printer, repo }) {
  const r = gen.generate(data);
  printer.print(r);
  repo.save(r);
}
