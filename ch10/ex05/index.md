## Nodeのモジュール方式(10.3)

名前を変更してもインポート側では追従されなかった。

## ES6のモジュール方式

### 名前付きエクスポート(add)

インポート側の import { add as plus } ... の add 部分も一緒に追随する。

### デフォルトエクスポート(export default add)

インポート側がdefaultで読み込んでいるため特にファイルに変更が無かった。

### 名前付きエクスポート(Calculator)

クラス名をリファクタで変更するとインポート側の import { Calculator as Calc } ... の Calculator 部分も追随する。

### 再エクスポート(export { default as Greeter } from "./util.js")

元が default ならインポート側は影響なし。
ただし、中間ファイル側で xxx as yyy を書き換える形で追随修正される。
