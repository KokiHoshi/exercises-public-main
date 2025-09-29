import { TypeMap } from "./index.js";

describe("TypeMap", () => {
  test("プリミティブ値は対応するラッパークラスのキーで登録・取得できる", () => {
    const tm = new TypeMap();
    const sym = Symbol.for("x");

    tm.set(String, "str");
    tm.set(Number, 123);
    tm.set(Boolean, true);
    tm.set(Symbol, sym);
    tm.set(BigInt, 10n);

    expect(tm.get(String)).toBe("str");
    expect(tm.get(Number)).toBe(123);
    expect(tm.get(Boolean)).toBe(true);
    expect(tm.get(Symbol)).toBe(sym);
    expect(tm.get(BigInt)).toBe(10n);
  });

  test("ユーザー定義クラスや組み込みクラスのインスタンスを登録・取得できる", () => {
    class Foo {}
    const tm = new TypeMap();
    const d = new Date();
    const foo = new Foo();

    tm.set(Date, d);
    tm.set(Foo, foo);

    expect(tm.get(Date)).toBe(d);
    expect(tm.get(Foo)).toBe(foo);
    expect(tm.get(Date) instanceof Date).toBe(true);
    expect(tm.get(Foo) instanceof Foo).toBe(true);
  });

  test("型が一致しない値を登録すると例外が発生する", () => {
    class Foo {}
    const tm = new TypeMap();

    expect(() => tm.set(Date, "not a date")).toThrow(TypeError);
    expect(() => tm.set(Number, "123")).toThrow(TypeError);
    expect(() => tm.set(String, 123)).toThrow(TypeError);
    expect(() => tm.set(Boolean, "true")).toThrow(TypeError);
    expect(() => tm.set(Foo, {})).toThrow(TypeError);
  });

  test("キーがコンストラクタでない場合は例外が発生する", () => {
    const tm = new TypeMap();
    const notCtor = () => {};

    expect(() => tm.set({}, 1)).toThrow(TypeError);
    expect(() => tm.set(notCtor, {})).toThrow(TypeError);
  });

  test("未登録のキーで取得するとundefinedが返る", () => {
    const tm = new TypeMap();
    expect(tm.get(String)).toBeUndefined();
  });

  test("setはメソッドチェーンで利用できる", () => {
    const tm = new TypeMap();
    tm.set(String, "a").set(Number, 1);
    expect(tm.get(String)).toBe("a");
    expect(tm.get(Number)).toBe(1);
  });
});
