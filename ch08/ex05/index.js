export const sequenceToObject = (...values) => {
    if (values.length % 2 !== 0) {
      throw new Error('値の個数は偶数である必要があります');
    }
    const obj = {};
    for (let i = 0; i < values.length; i += 2) {
      const key = values[i];
      const val = values[i + 1];
      if (typeof key !== 'string') {
        throw new TypeError(`キー(位置 ${i + 1})は string である必要があります: ${key}`);
      }
      obj[key] = val;
    }
    return obj;
  };
  
console.log(sequenceToObject("a", 1, "b", 2)); // => { a: 1, b: 2 }
console.log(sequenceToObject());               // => {}

const arr = ["x", 10, "y", 20, "z", 30];
console.log(sequenceToObject(...arr));         // => { x: 10, y: 20, z: 30 }