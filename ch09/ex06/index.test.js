import { TypedMap } from './index.js';

describe('TypedMap (composition)', () => {
  test('string → number', () => {
    const m = new TypedMap('string', 'number');
    m.set('a', 1).set('b', 2);
    expect(m.size).toBe(2);
    expect(m.get('a')).toBe(1);
    expect(m.has('b')).toBe(true);
  });

  test('不正な key は TypeError', () => {
    const m = new TypedMap('string', 'number');
    expect(() => m.set(1, 1)).toThrow(TypeError);
    expect(m.size).toBe(0);
  });

  test('不正な value は TypeError', () => {
    const m = new TypedMap('string', 'number');
    expect(() => m.set('x', 'not-number')).toThrow(TypeError);
    expect(m.size).toBe(0);
  });

  test('コンストラクタに iterable を渡した場合も型検証される', () => {
    const ok = [['x', 1], ['y', 2]];
    const m1 = new TypedMap('string', 'number', ok);
    expect(m1.size).toBe(2);

    const ng = [['x', 1], [2, 3]]; 
    expect(() => new TypedMap('string', 'number', ng)).toThrow(TypeError);
  });

  test('コンストラクタ指定をコンストラクタ関数でも可（Date など）', () => {
    const m = new TypedMap('string', Date);
    const d = new Date();
    m.set('now', d);
    expect(m.get('now')).toBeInstanceOf(Date);
    expect(() => m.set('bad', 123)).toThrow(TypeError);
  });

  test('entries/iterable 振る舞い（完全委譲の一例）', () => {
    const m = new TypedMap('string', 'number', [['a', 1], ['b', 2]]);
    const arr = [...m]; 
    expect(arr).toEqual([['a', 1], ['b', 2]]);
  });
});
