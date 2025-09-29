/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {

const sum = (x, y) => x + y;
const square = x => x * x;

exports.mean = data => data.reduce(sum)/data.length;
exports.stddev = function(d){
    let m = exports.mean(d);
    return Math.sqrt(d.map(x => x - m).map(square).reduce(sum)/(d.length-1))
};

/***/ }),
/* 2 */
/***/ ((module) => {

/**
* AbstractSetクラスでは、has()抽象メソッドのみを定義する。
*/
class AbstractSet {
    // このメソッドではエラーをスローする。このようにすることで、
    // サブクラスでこのメソッドを定義しなければならないようにする。
    has(x) { throw new Error("Abstract method"); }
}

/*
* AbstractEnumerableSetは、AbstractSetの抽象サブクラス。
* セットの大きさを返す抽象ゲッターメソッドと、抽象イテレータを定義する。
* また、この2つの抽象メソッドを使って、isEmpty()、toString()、
* equals()メソッドを実装する。サブクラスでは、イテレータと
* 大きさを返すゲッターメソッド、has()メソッドを実装するだけで、
* この3つのメソッドも使えるようになる。
*/
class AbstractEnumerableSet extends AbstractSet {
    get size() { throw new Error("Abstract method"); }
    [Symbol.iterator]() { throw new Error("Abstract method"); }
    isEmpty() { return this.size === 0; }
    toString() { return `{${Array.from(this).join(", ")}}`; }
    equals(set) {
        // 比較対象のセットがAbstractEnumerableSetでなければ、等しくない。
        if (!(set instanceof AbstractEnumerableSet)) return false;
        // 大きさが同じでなければ、等しくない。
        if (this.size !== set.size) return false;
        // このセットの要素を巡回する。
        for(let element of this) {
        // 要素が比較対象のセットのメンバーでなければ、等しくない。
        if (!set.has(element)) return false;
        }
        // 要素が一致したので、2つのセットは等しい。
        return true;
    }
}

/*
* AbstractWritableSetは、AbstractEnumerableSetの抽象サブクラス。
* セットから個々のメンバーを挿入したり削除したりするために、
* それぞれinsert()とremove()抽象メソッドを定義する。
* また、この2つのメソッドを使って、add()、subtract()、intersect()
* 具象メソッドを実装する。このAPI群は、JavaScript標準のSetクラスと
* 異なっているので注意。
*/
class AbstractWritableSet extends AbstractEnumerableSet {
    insert(x) { throw new Error("Abstract method"); }
    remove(x) { throw new Error("Abstract method"); }
    add(set) {
        for(let element of set) {
        this.insert(element);
    }
    }
    subtract(set) {
        for(let element of set) {
            this.remove(element);
        }
    }
    intersect(set) {
        for(let element of this) {
            if (!set.has(element)) {
                this.remove(element);
            }
        }
    }
}

/**
* BitSetはAbstractWritableSetの具象サブクラス。ある最大値よりも
* 小さい非負の整数がメンバーとなるセットに対して、非常に効率的な
* 固定サイズのセットを実装する。
*/
class BitSet extends AbstractWritableSet {
    constructor(max) {
        super();
        this.max = max; // 保存可能な最大整数。
        this.n = 0; // セット中に含まれる整数の数。
        this.numBytes = Math.floor(max / 8) + 1; // 必要となるバイト数。
        this.data = new Uint8Array(this.numBytes); // バイトの配列。
    }
    // このセットに保存可能な値かどうかを確認する内部メソッド。
    _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }
    // data配列のあるバイトのあるビットが立っているかどうかを調べる。
    // trueまたはfalseを返す。
    _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0; }
    // 値xがBitSetに含まれるかどうか。
    has(x) {
        if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            let bit = x % 8;
            return this._has(byte, bit);
        } else {
            return false;
        }
    }

    // 値xをBitSetに挿入する。
    insert(x) {
        if (this._valid(x)) { // 値が正当な場合、
            let byte = Math.floor(x / 8); // バイトとビットに変換する。
            let bit = x % 8;
            if (!this._has(byte, bit)) { // そのビットがまだ立っていない場合、
                this.data[byte] |= BitSet.bits[bit]; // ビットを立てる。
                this.n++; // セットの大きさをインクリメントする。
            }
        } else {
            throw new TypeError("Invalid set element: " + x );
        }
    }

    remove(x) {
        if (this._valid(x)) { // 値が正当な場合、
            let byte = Math.floor(x / 8); // バイトとビットを計算する。
            let bit = x % 8;
            if (this._has(byte, bit)) { // そのビットが立っていた場合、
                this.data[byte] &= BitSet.masks[bit]; // ビットを落とす。
                this.n--; // セットの大きさをデクリメントする。
            }
        } else {
            throw new TypeError("Invalid set element: " + x );
        }
    }
    // セットの大きさを返すゲッターメソッド。
    get size() { return this.n; }
        
    // 単にビットが立っているかどうかをチェックすることで巡回する。
    // （このコードはあまり賢くなく、大幅に最適化できる。）
    *[Symbol.iterator]() {
        for(let i = 0; i <= this.max; i++) {
            if (this.has(i)) {
                yield i;
            }
        }
    }
}

// has()、insert()、remove()メソッドで使うために事前に計算しておく。
BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);

module.exports = BitSet;

/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
// 必要なモジュールへの参照を取得する
const stats = __webpack_require__(1);
const BitSet = (__webpack_require__(2).BitSet);

// モジュールを使ってコードを記述する
let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);

let average = stats.mean([...s]); // 20
})();

/******/ })()
;