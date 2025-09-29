import { littleToBig, bigToLittle } from "./index.js";

describe("エンディアン変換", () => {
  test("littleToBig はバイト順を逆にする", () => {
    const data = new Uint32Array([0x12345678, 0xaabbccdd]);
    const result = littleToBig(data);

    expect(result).toBeInstanceOf(Uint32Array);
    expect(result.length).toBe(2);

    // 0x12345678 → 0x78563412
    expect(result[0]).toBe(0x78563412);
    // 0xAABBCCDD → 0xDDCCBBAA
    expect(result[1]).toBe(0xddccbbaa);
  });

  test("bigToLittle もバイト順を逆にする", () => {
    const data = new Uint32Array([0x12345678, 0xaabbccdd]);
    const result = bigToLittle(data);

    expect(result[0]).toBe(0x78563412);
    expect(result[1]).toBe(0xddccbbaa);
  });

  test("2回変換すると元の値に戻る", () => {
    const data = new Uint32Array([0x11223344, 0xdeadbeef]);
    const leToBe = littleToBig(data);
    const beToLe = bigToLittle(leToBe);

    expect(beToLe[0]).toBe(data[0]);
    expect(beToLe[1]).toBe(data[1]);
  });

  test("空配列を渡すと空配列を返す", () => {
    const data = new Uint32Array([]);
    expect(littleToBig(data)).toEqual(new Uint32Array([]));
    expect(bigToLittle(data)).toEqual(new Uint32Array([]));
  });
});
