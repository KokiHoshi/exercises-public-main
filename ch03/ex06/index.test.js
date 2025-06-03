import { slice } from "./index.js"; // typescript で書く場合は "./index.ts"

function sliceTestCase(str, indexStart, indexEnd) {
  return [str, indexStart, indexEnd, str.slice(indexStart, indexEnd)];
}

const str = "Hello World!";

// tests for slice
test.each([
  sliceTestCase(str),
  sliceTestCase(str, 2),
  sliceTestCase(str, -3),
  sliceTestCase(str, 100),
  sliceTestCase(str, -100),
  sliceTestCase(str, 0, str.length),
  sliceTestCase(str, str.length, 0),
  sliceTestCase(str, 2, 7),
  sliceTestCase(str, 7, 2),
  sliceTestCase(str, 3, 3),
  sliceTestCase(str, 2, 100),
  sliceTestCase(str, 100, 2),
  sliceTestCase(str, 2, -3),
  sliceTestCase(str, -3, 2),
  sliceTestCase(str, 2, NaN),
  sliceTestCase(str, NaN, 2),
  sliceTestCase(str, 2.3, 6.7),
  sliceTestCase(str, 2, Infinity),
])("slice(%p, %p, %p) => %p", (str, indexStart, indexEnd, expected) => {
  expect(slice(str, indexStart, indexEnd)).toBe(expected);
});
