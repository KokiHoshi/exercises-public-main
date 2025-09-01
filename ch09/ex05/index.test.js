import { instanceOf } from './index.js';

describe('instanceOf（instanceof を使わずに実装）', () => {
  class A {}
  class B extends A {}
  class C extends B {}
  class X {}

  test('多段継承: C -> B -> A, new C は A/B/C いずれにも属する', () => {
    const c = new C();
    expect(instanceOf(c, C)).toBe(true);
    expect(instanceOf(c, B)).toBe(true);
    expect(instanceOf(c, A)).toBe(true);
  });

  test('継承関係がないときは false', () => {
    const d = new Date();
    expect(instanceOf(d, Array)).toBe(false);
    const a = new A();
    expect(instanceOf(a, X)).toBe(false);
  });

  test('null / undefined は常に false', () => {
    expect(instanceOf(null, Object)).toBe(false);
    expect(instanceOf(undefined, Object)).toBe(false);
  });

  test('右辺が関数でもオブジェクトでもないなら TypeError', () => {
    expect(() => instanceOf({}, 123)).toThrow(TypeError);
    expect(() => instanceOf({}, 'Function')).toThrow(TypeError);
    expect(() => instanceOf({}, null)).toThrow(TypeError);
  });

  test('右辺関数の prototype がオブジェクトでない場合も TypeError', () => {
    function F() {}
    F.prototype = null;
    expect(() => instanceOf({}, F)).toThrow(TypeError);
  });

  test('Symbol.hasInstance が定義されていればそれを優先', () => {
    class Weird {
      static [Symbol.hasInstance](obj) {
        return obj === 42;
      }
    }
    expect(instanceOf(42, Weird)).toBe(true);
    expect(instanceOf('42', Weird)).toBe(false);
  });

  test('代表例との結果一致', () => {
    const arr = [];
    const map = new Map();
    const fn = function () {};
    expect(instanceOf(arr, Array)).toBe(arr instanceof Array);
    expect(instanceOf(arr, Object)).toBe(arr instanceof Object);
    expect(instanceOf(map, Map)).toBe(map instanceof Map);
    expect(instanceOf(fn, Function)).toBe(fn instanceof Function);
  });
});
