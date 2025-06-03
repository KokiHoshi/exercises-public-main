import { equals } from './index.js';

describe("Compare Object", () => {
  it("Strict equality", () => {
      expect(equals(42, 42)).toBe(true);
      expect(equals(null, null)).toBe(true);
  })

  it("return false if values are  non-objects", () => {
      expect(equals({x: 42}, 42)).toBe(false);
      expect(equals(null, {x: 42})).toBe(false);
  })

  it("return false if the number or names of properties do not match", () => {
      expect(equals({x: 1}, {y: 1})).toBe(false);
      expect(equals({x: 1}, {x: 1, y: 1})).toBe(false);
  })

  it("compare each property", () => {
      expect(equals({x: {y: {z: 10}}}, {x: {y: {z: 10}}})).toBe(true);
      expect(equals({x: {y: {z: 10}}}, {x: {y: {z: 10, w: 1}}})).toBe(false);
  })
})
