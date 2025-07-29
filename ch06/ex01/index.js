/**
 * 文字列をハッシュ値（数値）に変換するハッシュ関数
 * @param {string} key
 * @returns {number}
 */
export function hashCode(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // 32ビット整数に変換
  }
  return hash;
}

/**
 * ハッシュテーブルの生成関数
 * @param {number} capacity
 * @param {function} hashFn - ハッシュ関数（テスト用に注入可能）
 */
export function newHashTable(capacity, hashFn = hashCode) {
  return {
    size: 0,
    entries: new Array(capacity),

    get(key) {
      const index = Math.abs(hashFn(key) % this.entries.length);
      let node = this.entries[index];
      while (node) {
        if (node.key === key) return node.value;
        node = node.next;
      }
      return undefined;
    },

    put(key, value) {
      const index = Math.abs(hashFn(key) % this.entries.length);
      let node = this.entries[index];

      if (!node) {
        this.entries[index] = { key, value, next: undefined };
        this.size++;
        return;
      }

      let prev = null;
      while (node) {
        if (node.key === key) {
          node.value = value;
          return;
        }
        prev = node;
        node = node.next;
      }

      prev.next = { key, value, next: undefined };
      this.size++;
    },

    remove(key) {
      const index = Math.abs(hashFn(key) % this.entries.length);
      let node = this.entries[index];
      let prev = null;

      while (node) {
        if (node.key === key) {
          if (prev) {
            prev.next = node.next;
          } else {
            this.entries[index] = node.next;
          }
          this.size--;
          return;
        }
        prev = node;
        node = node.next;
      }
    },
  };
}
