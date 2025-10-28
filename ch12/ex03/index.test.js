// ch12/ex03/index.test.js
import { resettableCounter } from "./index.js";

describe("resettableCounter()", () => {
  test("next()で 0,1,2,... とカウントアップする", () => {
    const c = resettableCounter();
    expect(c.next().value).toBe(0);
    expect(c.next().value).toBe(1);
    expect(c.next().value).toBe(2);
  });

  test("初期値を指定できる", () => {
    const c = resettableCounter(5);
    expect(c.next().value).toBe(5);
    expect(c.next().value).toBe(6);
  });

  test('throw("reset") で 0 にリセットされる', () => {
    const c = resettableCounter(10);
    expect(c.next().value).toBe(10);
    expect(c.next().value).toBe(11);
    expect(c.throw("reset").value).toBe(0);
    expect(c.next().value).toBe(1);
    expect(c.next().value).toBe(2);
  });

  test("throw() が 'reset' 以外の値なら外に例外が伝播する", () => {
    const c = resettableCounter();
    c.next();
    expect(() => c.throw(new Error("boom"))).toThrow("boom");
  });

  test("複数回リセットできる（各 throw の戻り値が 0）", () => {
    const c = resettableCounter();
    expect(c.next().value).toBe(0);
    expect(c.next().value).toBe(1);

    expect(c.throw("reset").value).toBe(0);
    expect(c.next().value).toBe(1);

    expect(c.throw("reset").value).toBe(0);
    expect(c.next().value).toBe(1);
  });

  test("異なるインスタンスは独立してカウントする", () => {
    const a = resettableCounter();
    const b = resettableCounter(100);
    expect(a.next().value).toBe(0);
    expect(a.next().value).toBe(1);
    expect(b.next().value).toBe(100);
    expect(b.next().value).toBe(101);
  });
});
