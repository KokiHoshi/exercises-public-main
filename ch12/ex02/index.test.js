import { fibonacciIterator } from "./index.js";

describe("fibonacciIterator()", () => {
  test("next()で 1,1,2,3,5,8,13,21,34,55… の順に返す", () => {
    const it = fibonacciIterator();
    const got = [];
    for (let i = 0; i < 10; i++) {
      const r = it.next();
      expect(r).toHaveProperty("value");
      expect(r).toHaveProperty("done", false);
      got.push(r.value);
    }
    expect(got).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });

  test("[Symbol.iterator]() が自分自身(it)を返し、for...ofで利用できる", () => {
    const it = fibonacciIterator();
    expect(it[Symbol.iterator]()).toBe(it);

    // for...of で先頭7つだけ取り出す（無限なので break 必須）
    const first7 = [];
    for (const n of fibonacciIterator()) {
      first7.push(n);
      if (first7.length >= 7) break;
    }
    expect(first7).toEqual([1, 1, 2, 3, 5, 8, 13]);
  });

  test("イテレータのインスタンスは独立（複数生成しても状態は共有されない）", () => {
    const a = fibonacciIterator();
    const b = fibonacciIterator();

    // a を2回進める: 1,1
    expect(a.next().value).toBe(1);
    expect(a.next().value).toBe(1);

    // b は独立に 1 から始まる
    expect(b.next().value).toBe(1);
    expect(b.next().value).toBe(1);

    // a の続きは 2
    expect(a.next().value).toBe(2);
  });

  test("大量に進めても done は常に false（無限列）", () => {
    const it = fibonacciIterator();
    let last;
    for (let i = 0; i < 100; i++) last = it.next();
    expect(last.done).toBe(false);
    expect(typeof last.value).toBe("number");
  });

  test("for...ofでbreakした後に再度回しても独立な新イテレータは1から始まる", () => {
    const picked = [];
    for (const n of fibonacciIterator()) {
      picked.push(n);
      if (picked.length >= 3) break; // 1,1,2 で中断
    }
    expect(picked).toEqual([1, 1, 2]);

    // 新しく作ればまた 1 から
    const again = [];
    for (const n of fibonacciIterator()) {
      again.push(n);
      if (again.length >= 3) break;
    }
    expect(again).toEqual([1, 1, 2]);
  });
});
