import { assign } from "./index.js";

// 期待値の生成
function testCase(target, sameTarget, sources) {
  try {
    return {
      target,
      sources,
      expected: Object.assign(sameTarget, ...sources),
      exception: null,
    };
  } catch (e) {
    return { target, sources, expected: null, exception: e };
  }
}
// シンボルの作成
const sym1 = Symbol("sym1");
const sym2 = Symbol("sym2");
// getter,setterの作成
function getterSetterObj(name) {
  const obj = {
    get name() {
      return this._name;
    },
    set name(v) {
      this._name = v;
    },
  };
  return Object.defineProperty(obj, "_name", {
    value: name,
    enumerable: false,
    writable: true,
    configurable: false,
  });
}

const objWithSymbolProps = {
  [sym1]: "symbol1",
};
Object.defineProperty(objWithSymbolProps, sym2, {
  enumerable: false,
  value: "symbol2",
});

test.each([
  testCase({ foo: "foo" }, { foo: "foo" }, []), // {'foo': 'foo'}
  testCase({}, {}, [
    { foo: "foo", bar: "bar" }, 
    { fizz: "fizz", buzz: "buzz" }, // {'foo': 'foo', 'bar': 'bar', 'fizz': 'fizz', 'buzz': 'buzz'}
  ]),
  testCase({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
    { foo: "fooo", bar: "bar" },
    { foo: "foooo", fizz: "fizz", buzz: "buzz" }, // 上書き {'foo': 'foooo', 'hello': 'world', 'bar': 'bar', 'fizz': 'fizz', 'buzz': 'buzz'}
  ]),
  testCase(
    { parent: { child: { foo: "fooo", bar: "bar" } } },
    { parent: { child: { foo: "fooo", bar: "bar" } } },
    [{ parent: { child: { fizz: "fizz", buzz: "buzz" } } }], //ネスト {'parent': {'child': {'fizz': 'fizz', 'buzz': 'buzz'}}}
  ),
  testCase({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
    123,
    true,
    ["aa", "bb", "cc"],
    null,
    undefined, // 非オブジェクト・配列・null混在 {'foo': 'foo', 'hello': 'world', 0: 'aa', 1: 'bb', 2: 'cc'}
  ]),
  testCase(1, 1, [{ foo: "foo", bar: "bar" }]), // 数値 {'foo': 'foo', 'bar': 'bar'}
  testCase(true, true, [{ foo: "foo", bar: "bar" }]),// 真偽値 {'foo': 'foo', 'bar': 'bar'}
  testCase(
    ["aa", "bb", "cc"],
    ["aa", "bb", "cc"],
    [{ foo: "foo", bar: "bar" }], // 配列 {0: 'aa', 1: 'bb', 2: 'cc', 'foo': 'foo', 'bar': 'bar'}
  ),
  testCase(new Map(), new Map(), [{ foo: "foo", bar: "bar" }]), // Map {'foo': 'foo', 'bar': 'bar'}
  testCase(new Date(), new Date(), [{ foo: "foo", bar: "bar" }]), // Date {'foo': 'foo', 'bar': 'bar'}
  testCase(null, null, [{ foo: "foo", bar: "bar" }]), // null例外 TypeError('Cannot convert undefined or null to object')
  testCase(undefined, undefined, [{ foo: "foo", bar: "bar" }]), // undefined例外 TypeError('Cannot convert undefined or null to object')
  testCase({ foo: "foo" }, { foo: "foo" }, [objWithSymbolProps]), // シンボル風プロパティ {'foo': 'foo', 'sym1': 'symbol1'}
  testCase(getterSetterObj("alice"), getterSetterObj("alice"), [
    getterSetterObj("bob"),
  ]), //getter/setter {'_name': 'bob'}
])(
  "test case $#: expected: $expected, exception: $exception",
  ({ target, sources, expected, exception }) => {
    if (exception) {
      expect(() => assign(target, ...sources)).toThrowError(exception);
    } else {
      expect(assign(target, ...sources)).toEqual(expected);
    }
  },
);
