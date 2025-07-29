const obj = {};

Object.defineProperty(obj, 'x', {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false
});

console.log('初期値:', obj.x); // => 42

try {
  obj.x = 100;
} catch (e) {
  console.log('書き換えエラー:', e.message);
}

try {
  delete obj.x;
} catch (e) {
  console.log('削除エラー:', e.message);
}

console.log('削除後:', obj.x); // => 42（削除できない）

console.log('hasOwnProperty:', obj.hasOwnProperty('x')); // => true
console.log('Object.keys:', Object.keys(obj)); // => []
console.log('propertyIsEnumerable:', obj.propertyIsEnumerable('x')); // => false

// 比較用のプロパティ y
Object.defineProperty(obj, 'y', {
  value: 'visible',
  writable: true,
  enumerable: true,
  configurable: true
});

console.log('\n=== y プロパティ ===');
console.log('初期値:', obj.y); // => visible

obj.y = 'changed';
console.log('変更後:', obj.y); // => changed

console.log('Object.keys:', Object.keys(obj)); // => ['y']
console.log('hasOwnProperty:', obj.hasOwnProperty('y')); // => true
console.log('propertyIsEnumerable:', obj.propertyIsEnumerable('y')); // => true

delete obj.y;
console.log('削除後:', obj.y); // => undefined（削除された）
