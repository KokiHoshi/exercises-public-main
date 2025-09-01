export const addMyCall = (f) => {
    if (typeof f !== 'function') throw new TypeError('addMyCall expects a function');
  
    Object.defineProperty(f, 'myCall', {
      value: function (thisArg, ...args) {
        const bound = this.bind(thisArg, ...args); // bind で thisと引数を固定
        return bound(); // 実行して戻り値を返す
      },
      writable: true,
      configurable: true,
      enumerable: false, 
    });
  
    return f; 
  };
  