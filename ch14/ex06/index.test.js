// index.test.js

import { makeProxyAndLogs } from "./index.js";

describe("makeProxyAndLogs", () => {
  test("メソッド呼び出しをログに残す", () => {
    const a = {
      p: 1,
      f: (x, y) => x + y,
    };

    const [proxy, logs] = makeProxyAndLogs(a);

    expect(logs).toHaveLength(0); // まだ何も呼ばれていない

    // プロパティアクセスはそのまま
    expect(proxy.p).toBe(1);
    expect(logs).toHaveLength(0);

    // メソッド呼び出し
    const result = proxy.f(1, 2);
    expect(result).toBe(3);

    expect(logs).toHaveLength(1);
    const log = logs[0];

    expect(log.name).toBe("f");
    expect(log.args).toStrictEqual([1, 2]);
    expect(log.timestamp).toBeInstanceOf(Date);
  });

  test("複数メソッド・複数回呼び出しのログ", () => {
    const obj = {
      mul(x, y) {
        return x * y;
      },
      inc(x) {
        return x + 1;
      },
    };

    const [proxy, logs] = makeProxyAndLogs(obj);

    proxy.mul(2, 3); // 6
    proxy.inc(10); // 11
    proxy.inc(0); // 1

    expect(logs).toHaveLength(3);
    expect(logs.map((l) => l.name)).toStrictEqual(["mul", "inc", "inc"]);
    expect(logs[0].args).toStrictEqual([2, 3]);
    expect(logs[1].args).toStrictEqual([10]);
    expect(logs[2].args).toStrictEqual([0]);
  });

  test("メソッドを取得するだけではログは増えない", () => {
    const obj = {
      hello(name) {
        return `Hello, ${name}`;
      },
    };

    const [proxy, logs] = makeProxyAndLogs(obj);

    const fn = proxy.hello; // 取得のみ
    expect(logs).toHaveLength(0);

    fn("World");
    expect(logs).toHaveLength(1);
    expect(logs[0].name).toBe("hello");
  });
});
