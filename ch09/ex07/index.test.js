import { InstrumentedLinkedList } from "./index.js";

describe("InstrumentedLinkedList", () => {
  it("#push", () => {
    const list = new InstrumentedLinkedList();
    list.push("A");
    expect(list.pushCount).toBe(1);
  });
  it("#pushAll", () => {
    const list = new InstrumentedLinkedList();
    list.pushAll("A", "B");
    expect(list.pushCount).toBe(2);
  });
});
