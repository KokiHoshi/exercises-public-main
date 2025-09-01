// index.test.js
import { PositiveNumber } from './index.js';

describe('PositiveNumber (closure version)', () => {
  test('正の初期値で生成でき、getX で値を取得できる', () => {
    const p = PositiveNumber(3);
    expect(p.getX()).toBe(3);
  });

  test('初期値が 0 以下ならエラー', () => {
    expect(() => PositiveNumber(0)).toThrow('require : x > 0');
    expect(() => PositiveNumber(-1)).toThrow('require : x > 0');
  });

  test('setX で正の値に更新できる / 0 以下はエラー', () => {
    const p = PositiveNumber(5);
    p.setX(10);
    expect(p.getX()).toBe(10);
    expect(() => p.setX(0)).toThrow('require : x > 0');
    // 失敗後も値は変わっていない
    expect(p.getX()).toBe(10);
  });

  test('外部から x を直接書き換えられない（プロパティ追加不可）', () => {
    const p = PositiveNumber(7);

    // strict mode下では TypeError を投げる
    expect(() => {
      // @ts-ignore
      p.x = 0;
    }).toThrow(TypeError);

    // プロパティは存在しないまま＆内部値は保護される
    expect('x' in p).toBe(false);
    expect(p.getX()).toBe(7);

    // defineProperty も凍結により TypeError
    expect(() =>
      Object.defineProperty(p, 'x', { value: -1 })
    ).toThrow(TypeError);
  });

  test('公開オブジェクトは freeze 済みで、メソッドの差し替えも不可', () => {
    const p = PositiveNumber(2);
    expect(Object.isFrozen(p)).toBe(true);
    expect(Object.isExtensible(p)).toBe(false);

    // 代入は TypeError（strict mode）
    expect(() => {
      // @ts-ignore
      p.getX = () => 999;
    }).toThrow(TypeError);

    // 差し替えられていないことを確認
    expect(p.getX()).toBe(2);

    // 記述子の検証
    const d = Object.getOwnPropertyDescriptor(p, 'getX');
    expect(d?.writable).toBe(false);
    expect(d?.configurable).toBe(false);

    // defineProperty での差し替えも不可
    expect(() =>
      Object.defineProperty(p, 'getX', { value: () => 999 })
    ).toThrow(TypeError);
  });
});
