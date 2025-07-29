const o = {};              // ベースとなるオブジェクト
const p = Object.create(o); // o をプロトタイプに持つ
const q = Object.create(p); // p をプロトタイプに持つ

// o が p のプロトタイプチェーン上にある
console.log(o.isPrototypeOf(p)); // => true

// o が q のプロトタイプチェーン上にある
console.log(o.isPrototypeOf(q)); // => true

// p が q のプロトタイプチェーン上にある
console.log(p.isPrototypeOf(q)); // => true

// Object.prototype はすべてのオブジェクトの最上位プロトタイプ
console.log(Object.prototype.isPrototypeOf([]));         // => true（Array のインスタンス）
console.log(Object.prototype.isPrototypeOf(new Date())); // => true（Date のインスタンス）
console.log(Object.prototype.isPrototypeOf(new Map()));  // => true（Map のインスタンス）

// Array.prototype は配列にだけ存在
console.log(Array.prototype.isPrototypeOf([]));          // => true
console.log(Array.prototype.isPrototypeOf(new Date()));  // => false

// Date.prototype は Date オブジェクトにだけ
console.log(Date.prototype.isPrototypeOf(new Date()));   // => true
console.log(Date.prototype.isPrototypeOf([]));           // => false

// Map.prototype は Map のインスタンスにだけ
console.log(Map.prototype.isPrototypeOf(new Map()));     // => true
console.log(Map.prototype.isPrototypeOf({}));            // => false
