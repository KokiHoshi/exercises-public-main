export class LinkedList {
  #head = null;
  #tail = null;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  push(value) {
    const newNode = { value, next: null };
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
  }

  pushAll(...items) {
    items.forEach((item) => this.push(item));
  }

  toString() {
    let current = this.#head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return "[" + values.join(", ") + "]";
  }
}

/**
 * 要素のpush回数を記録するLinkedList
 */
export class InstrumentedLinkedList {
  #list = new LinkedList();
  #pushCount = 0;

  /** 要素の push 操作が行われた回数 */
  get pushCount() {
    return this.#pushCount;
  }

  push(item) {
    this.#list.push(item);
    this.#pushCount += 1;
  }

  pushAll(...items) {
    // this.push を通して1件ずつ追加
    items.forEach((item) => this.push(item));
  }

  toString() {
    return this.#list.toString();
  }
}
