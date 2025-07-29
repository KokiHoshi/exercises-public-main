export function makeFixedSizeArray(size) {
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4;

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }

  get(index) {
    if (index < 0 || index >= this.len) {
      throw new Error(`Index out of bounds: ${index}`);
    }
    return this.array.get(index);
  }

  set(index, value) {
    if (index < 0 || index >= this.len) {
      throw new Error(`Index out of bounds: ${index}`);
    }
    this.array.set(index, value);
  }

  length() {
    return this.len;
  }

  push(value) {
    if (this.len >= this.array.length()) {
      const old = this.array;
      this.array = makeFixedSizeArray(old.length() * 2);
      for (let i = 0; i < this.len; i++) {
        this.array.set(i, old.get(i));
      }
    }
    this.array.set(this.len, value);
    this.len++;
  }
}
