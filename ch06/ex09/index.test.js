import { jest } from "@jest/globals";

test("ex09", () => {
  const mock = jest.fn();

  const obj = {
    x: 0,
    y: 0,
    sum() {
      mock();
      return this.x + this.y;
    },
  };

  // ここに１行のコードを書く
  Object.defineProperty(obj, "toJSON", {value() { return { ...this, sum: this.sum() }; }, });

  obj.x = 1;
  obj.y = 2;
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});


// JSON.stringify() toJSONがあれば呼んで返り値をJSON化
// toJSON→this.sum()が呼ばれる
// sum()内でmock()が呼ばれ、2+1=3が返される
// expect(mock).toHaveBeenCalled() →mock()が呼ばれたことを検証
