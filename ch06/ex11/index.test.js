import { point } from './index.js';

describe('point オブジェクトのテスト', () => {
  test('getter: x, y が r, theta から正しく計算される', () => {
    point.r = 5;
    point.theta = Math.PI / 4;
    expect(point.x).toBeCloseTo(5 * Math.cos(Math.PI / 4));
    expect(point.y).toBeCloseTo(5 * Math.sin(Math.PI / 4));
  });

  test('setter: x に値を設定すると r, theta が更新される', () => {
    point.y = 3; // 先に y を設定
    point.x = 4; // x を変更
    expect(point.r).toBeCloseTo(5); // √(3^2 + 4^2)
    expect(point.theta).toBeCloseTo(Math.atan2(3, 4));
  });

  test('setter: y に値を設定すると r, theta が更新される', () => {
    point.x = 0; // 先に x を設定
    point.y = 2; // y を変更
    expect(point.r).toBeCloseTo(2); // √(0^2 + 2^2)
    expect(point.theta).toBeCloseTo(Math.PI / 2);
  });

  test('x に NaN を設定するとエラーが投げられる', () => {
    expect(() => {
      point.x = NaN;
    }).toThrow("Invalid x value: NaN");
  });

  test('y に NaN を設定するとエラーが投げられる', () => {
    expect(() => {
      point.y = NaN;
    }).toThrow("Invalid y value: NaN");
  });
});
