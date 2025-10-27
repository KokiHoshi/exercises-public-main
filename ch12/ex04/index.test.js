import { primes } from "./index.js";

test("先頭10個の素数", () => {
  const g = primes();
  const got = [];
  for (let i = 0; i < 10; i++) got.push(g.next().value);
  expect(got).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
});

test("for...of でも遅延で取り出せる（break 必須）", () => {
  const picked = [];
  for (const p of primes()) {
    picked.push(p);
    if (picked.length >= 15) break;
  }
  expect(picked.slice(0, 5)).toEqual([2, 3, 5, 7, 11]);
  expect(picked[picked.length - 1]).toBe(47); // 15個目
});

// 連続呼び出しで単調増加
test("増加性の簡易チェック", () => {
  const g = primes();
  let prev = g.next().value; // 2
  for (let i = 0; i < 50; i++) {
    const cur = g.next().value;
    expect(cur).toBeGreaterThan(prev);
    prev = cur;
  }
});
