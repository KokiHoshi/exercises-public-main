// プロトタイプオブジェクトを作成
const proto = {};
Object.defineProperty(proto, "1", {
  value: "proto_1",
  enumerable: true,
});
Object.defineProperty(proto, "alpha", {
  value: "proto_alpha",
  enumerable: true,
});
Object.defineProperty(proto, "shared", {
  value: "proto_shared",
  enumerable: true,
});

// 派生オブジェクトを作成
const obj = Object.create(proto);

// 同名の数値名プロパティ（プロトタイプにもある）
Object.defineProperty(obj, "1", {
  value: "obj_1",
  enumerable: true,
});

// 同名でない数値名プロパティ
Object.defineProperty(obj, "2", {
  value: "obj_2",
  enumerable: true,
});

// 同名の文字列名プロパティ（プロトタイプにもある）
Object.defineProperty(obj, "alpha", {
  value: "obj_alpha",
  enumerable: true,
});

// 同名でない文字列名プロパティ
Object.defineProperty(obj, "beta", {
  value: "obj_beta",
  enumerable: true,
});

// 列挙不可なプロパティ（プロトタイプに同名が存在）
Object.defineProperty(obj, "shared", {
  value: "obj_shared",
  enumerable: false,
});

// for...in で列挙される順番を確認
console.log("for...in の列挙順:");
for (const key in obj) {
  console.log(key);
}
