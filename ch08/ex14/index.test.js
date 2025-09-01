// index.test.js
import { jest } from '@jest/globals';
import { any, catching } from './index.js';

describe('any', () => {
  test('いずれかが true なら true）', () => {
    const isNonZero = any(n => n > 0, n => n < 0);
    expect(isNonZero(0)).toBe(false);
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
  });

  test('関数が0個なら常に false', () => {
    const f = any();
    expect(f(123)).toBe(false);
    expect(f()).toBe(false);
  });

  test('短絡評価: 最初の true になったら以降は呼ばれない', () => {
    const p1 = jest.fn().mockReturnValue(true);
    const p2 = jest.fn().mockReturnValue(false);
    const f = any(p1, p2);
    expect(f(10)).toBe(true);
    expect(p1).toHaveBeenCalledTimes(1);
    expect(p2).not.toHaveBeenCalled();
  });

  test('引数はそのまま渡される', () => {
    const f = any((a, b) => a + b > 5);
    expect(f(3, 3)).toBe(true);
    expect(f(2, 2)).toBe(false);
  });

  test('this は呼び出し元のものが保持される', () => {
    const obj = {
      t: 5,
      gt(n) { return n > this.t; },
    };
    const f = any(obj.gt);
    expect(f.call(obj, 6)).toBe(true);
    expect(f.call(obj, 4)).toBe(false);
  });

  test('引数に関数以外が含まれている場合は実行時に TypeError', () => {
    const f = any(123, n => n > 0); // 生成時は通るが、実行時にチェック
    expect(() => f(1)).toThrow(TypeError);
  });
});

describe('catching', () => {
  test('成功時: tryFn の結果を返しhandler は呼ばれない', () => {
    const tryFn = x => x + 1;
    const handler = jest.fn();
    const safe = catching(tryFn, handler);
    expect(safe(1)).toBe(2);
    expect(handler).not.toHaveBeenCalled();
  });

  test('例外時:エラーを handler に渡し、その戻り値を返す', () => {
    const tryFn = () => { throw new SyntaxError('bad'); };
    const handler = jest.fn(e => ({ error: e.name }));
    const safe = catching(tryFn, handler);
    expect(safe('x')).toEqual({ error: 'SyntaxError' });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBeInstanceOf(SyntaxError);
  });

  test('引数はそのまま tryFn に渡される', () => {
    const tryFn = jest.fn((a, b) => a * b);
    const handler = jest.fn();
    const safe = catching(tryFn, handler);
    expect(safe(2, 3)).toBe(6);
    expect(tryFn).toHaveBeenCalledWith(2, 3);
  });

  test('this は handler にも引き継がれる', () => {
    const ctx = { prefix: 'P:' };
    const tryFn = () => { throw new Error('x'); };
    function handler(err) { return this.prefix + err.message; }
    const safe = catching(tryFn, handler);
    expect(safe.call(ctx)).toBe('P:x');
  });

  test('関数以外を渡すと実行時に TypeError', () => {
    const bad1 = catching(123, () => {});
    expect(() => bad1()).toThrow(TypeError);
    const bad2 = catching(() => 1, 'x');
    expect(() => bad2()).toThrow(TypeError);
  });
});
