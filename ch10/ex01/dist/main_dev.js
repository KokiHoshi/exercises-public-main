/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ch10/ex01/index.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/index.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{// 必要なモジュールへの参照を取得する\r\nconst stats = __webpack_require__(/*! ./stats.cjs */ \"./ch10/ex01/stats.cjs\");\r\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./ch10/ex01/sets.cjs\").BitSet);\r\n\r\n// モジュールを使ってコードを記述する\r\nlet s = new BitSet(100);\r\ns.insert(10);\r\ns.insert(20);\r\ns.insert(30);\r\n\r\nlet average = stats.mean([...s]); // 20\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/index.cjs?\n}");

/***/ }),

/***/ "./ch10/ex01/sets.cjs":
/*!****************************!*\
  !*** ./ch10/ex01/sets.cjs ***!
  \****************************/
/***/ ((module) => {

eval("{/**\r\n* AbstractSetクラスでは、has()抽象メソッドのみを定義する。\r\n*/\r\nclass AbstractSet {\r\n    // このメソッドではエラーをスローする。このようにすることで、\r\n    // サブクラスでこのメソッドを定義しなければならないようにする。\r\n    has(x) { throw new Error(\"Abstract method\"); }\r\n}\r\n\r\n/*\r\n* AbstractEnumerableSetは、AbstractSetの抽象サブクラス。\r\n* セットの大きさを返す抽象ゲッターメソッドと、抽象イテレータを定義する。\r\n* また、この2つの抽象メソッドを使って、isEmpty()、toString()、\r\n* equals()メソッドを実装する。サブクラスでは、イテレータと\r\n* 大きさを返すゲッターメソッド、has()メソッドを実装するだけで、\r\n* この3つのメソッドも使えるようになる。\r\n*/\r\nclass AbstractEnumerableSet extends AbstractSet {\r\n    get size() { throw new Error(\"Abstract method\"); }\r\n    [Symbol.iterator]() { throw new Error(\"Abstract method\"); }\r\n    isEmpty() { return this.size === 0; }\r\n    toString() { return `{${Array.from(this).join(\", \")}}`; }\r\n    equals(set) {\r\n        // 比較対象のセットがAbstractEnumerableSetでなければ、等しくない。\r\n        if (!(set instanceof AbstractEnumerableSet)) return false;\r\n        // 大きさが同じでなければ、等しくない。\r\n        if (this.size !== set.size) return false;\r\n        // このセットの要素を巡回する。\r\n        for(let element of this) {\r\n        // 要素が比較対象のセットのメンバーでなければ、等しくない。\r\n        if (!set.has(element)) return false;\r\n        }\r\n        // 要素が一致したので、2つのセットは等しい。\r\n        return true;\r\n    }\r\n}\r\n\r\n/*\r\n* AbstractWritableSetは、AbstractEnumerableSetの抽象サブクラス。\r\n* セットから個々のメンバーを挿入したり削除したりするために、\r\n* それぞれinsert()とremove()抽象メソッドを定義する。\r\n* また、この2つのメソッドを使って、add()、subtract()、intersect()\r\n* 具象メソッドを実装する。このAPI群は、JavaScript標準のSetクラスと\r\n* 異なっているので注意。\r\n*/\r\nclass AbstractWritableSet extends AbstractEnumerableSet {\r\n    insert(x) { throw new Error(\"Abstract method\"); }\r\n    remove(x) { throw new Error(\"Abstract method\"); }\r\n    add(set) {\r\n        for(let element of set) {\r\n        this.insert(element);\r\n    }\r\n    }\r\n    subtract(set) {\r\n        for(let element of set) {\r\n            this.remove(element);\r\n        }\r\n    }\r\n    intersect(set) {\r\n        for(let element of this) {\r\n            if (!set.has(element)) {\r\n                this.remove(element);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n/**\r\n* BitSetはAbstractWritableSetの具象サブクラス。ある最大値よりも\r\n* 小さい非負の整数がメンバーとなるセットに対して、非常に効率的な\r\n* 固定サイズのセットを実装する。\r\n*/\r\nclass BitSet extends AbstractWritableSet {\r\n    constructor(max) {\r\n        super();\r\n        this.max = max; // 保存可能な最大整数。\r\n        this.n = 0; // セット中に含まれる整数の数。\r\n        this.numBytes = Math.floor(max / 8) + 1; // 必要となるバイト数。\r\n        this.data = new Uint8Array(this.numBytes); // バイトの配列。\r\n    }\r\n    // このセットに保存可能な値かどうかを確認する内部メソッド。\r\n    _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }\r\n    // data配列のあるバイトのあるビットが立っているかどうかを調べる。\r\n    // trueまたはfalseを返す。\r\n    _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0; }\r\n    // 値xがBitSetに含まれるかどうか。\r\n    has(x) {\r\n        if (this._valid(x)) {\r\n            let byte = Math.floor(x / 8);\r\n            let bit = x % 8;\r\n            return this._has(byte, bit);\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    // 値xをBitSetに挿入する。\r\n    insert(x) {\r\n        if (this._valid(x)) { // 値が正当な場合、\r\n            let byte = Math.floor(x / 8); // バイトとビットに変換する。\r\n            let bit = x % 8;\r\n            if (!this._has(byte, bit)) { // そのビットがまだ立っていない場合、\r\n                this.data[byte] |= BitSet.bits[bit]; // ビットを立てる。\r\n                this.n++; // セットの大きさをインクリメントする。\r\n            }\r\n        } else {\r\n            throw new TypeError(\"Invalid set element: \" + x );\r\n        }\r\n    }\r\n\r\n    remove(x) {\r\n        if (this._valid(x)) { // 値が正当な場合、\r\n            let byte = Math.floor(x / 8); // バイトとビットを計算する。\r\n            let bit = x % 8;\r\n            if (this._has(byte, bit)) { // そのビットが立っていた場合、\r\n                this.data[byte] &= BitSet.masks[bit]; // ビットを落とす。\r\n                this.n--; // セットの大きさをデクリメントする。\r\n            }\r\n        } else {\r\n            throw new TypeError(\"Invalid set element: \" + x );\r\n        }\r\n    }\r\n    // セットの大きさを返すゲッターメソッド。\r\n    get size() { return this.n; }\r\n        \r\n    // 単にビットが立っているかどうかをチェックすることで巡回する。\r\n    // （このコードはあまり賢くなく、大幅に最適化できる。）\r\n    *[Symbol.iterator]() {\r\n        for(let i = 0; i <= this.max; i++) {\r\n            if (this.has(i)) {\r\n                yield i;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n// has()、insert()、remove()メソッドで使うために事前に計算しておく。\r\nBitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\r\nBitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);\r\n\r\nmodule.exports = BitSet;\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/sets.cjs?\n}");

/***/ }),

/***/ "./ch10/ex01/stats.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/stats.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{const sum = (x, y) => x + y;\r\nconst square = x => x * x;\r\n\r\nexports.mean = data => data.reduce(sum)/data.length;\r\nexports.stddev = function(d){\r\n    let m = exports.mean(d);\r\n    return Math.sqrt(d.map(x => x - m).map(square).reduce(sum)/(d.length-1))\r\n};\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/stats.cjs?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ch10/ex01/index.cjs");
/******/ 	
/******/ })()
;