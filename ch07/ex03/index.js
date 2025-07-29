export function sum(array = []) {
  return array.reduce((acc, cur) => acc + cur, 0);
}

export function join(array, separator = ",") {
  if (array === undefined) {
    throw new Error("join requires an array");
  }
  return array.reduce((acc, cur, i) => {
    return i === 0 ? `${cur ?? ""}` : `${acc}${separator}${cur ?? ""}`;
  }, "");
}

export function reverse(array) {
  if (array === undefined) {
    throw new Error("reverse requires an array");
  }
  return array.reduce((acc, cur) => [cur, ...acc], []);
}

export function every(array, predicate) {
  return array.reduce((acc, cur, i, arr) => acc && predicate(cur, i, arr), true);
}

export function some(array, predicate) {
  return array.reduce((acc, cur, i, arr) => acc || predicate(cur, i, arr), false);
}
