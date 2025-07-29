import { getAllPropertyKeys } from './index.js';

describe('getAllPropertyKeys()', () => {
  test('文字列プロパティ（列挙可/不可の両方）を含む', () => {
    const obj = {};
    Object.defineProperty(obj, 'visible', {
      value: 1,
      enumerable: true
    });
    Object.defineProperty(obj, 'hidden', {
      value: 2,
      enumerable: false
    });

    const keys = getAllPropertyKeys(obj);
    expect(keys).toContain('visible');
    expect(keys).toContain('hidden');
  });

  test('Symbol プロパティを含む', () => {
    const sym = Symbol('mySymbol');
    const obj = { [sym]: 123 };

    const keys = getAllPropertyKeys(obj);
    expect(keys).toContain(sym);
  });

  test('継承された列挙可能なプロパティのみを含む（非列挙プロパティは含まない）', () => {
    const proto = {
      inheritedVisible: 'プロトタイプから継承された列挙可能プロパティ'
    };
    Object.defineProperty(proto, 'inheritedHidden', {
      value: 'プロトタイプから継承された非列挙プロパティ',
      enumerable: false
    });

    const obj = Object.create(proto);
    obj.ownProp = 42;

    const keys = getAllPropertyKeys(obj);
    expect(keys).toContain('ownProp');               // 独自
    expect(keys).toContain('inheritedVisible');      // 継承（列挙可）
    expect(keys).not.toContain('inheritedHidden');   // 継承（列挙不可）
  });

  test('継承された Symbol プロパティは含まれない', () => {
    const sym = Symbol('protoSymbol');
    const proto = { [sym]: 999 };
    const obj = Object.create(proto);

    const keys = getAllPropertyKeys(obj);
    expect(keys).not.toContain(sym); // 継承された Symbol は含まない
  });
});
