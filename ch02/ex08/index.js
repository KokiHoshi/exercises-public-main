import fs from "fs"
import { parse } from "acorn"

// ファイル読み込み
const code1 = fs.readFileSync("./sample1.js", "utf-8")
const code2 = fs.readFileSync("./sample2.js", "utf-8")

// AST 解析（ECMAScript 2020 準拠）
const ast1 = parse(code1, { ecmaVersion: 2020 })
const ast2 = parse(code2, { ecmaVersion: 2020 })

// 結果出力（JSON形式）
fs.writeFileSync("sample1.ast.json", JSON.stringify(ast1, null, 2), "utf-8")
fs.writeFileSync("sample2.ast.json", JSON.stringify(ast2, null, 2), "utf-8")
