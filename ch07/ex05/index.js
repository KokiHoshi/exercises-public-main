export function pop(array) {
  return array.slice(0, -1);
}

export function push(array, value) {
  return [...array, value];
}

export function shift(array) {
  return array.slice(1);
}

export function unshift(array, value) {
  return [value, ...array];
}

export function sort(array, compareFn) {
  return [...array].sort(compareFn);
}

