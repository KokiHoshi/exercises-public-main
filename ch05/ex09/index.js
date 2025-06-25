export function safeJsonParse(str) {
  try {
    const data = JSON.parse(str);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

console.log(safeJsonParse('{"name":"Alice","age":30}')); // OK
console.log(safeJsonParse("not json")); // NG
console.log(safeJsonParse("[1, 2, 3]")); // OK
console.log(safeJsonParse("{ bad json }")); // NG
