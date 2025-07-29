export function restrict(target, template) {
  for (const key of Object.keys(target)) {
    if (!Object.prototype.hasOwnProperty.call(template, key)) {
      delete target[key];
    }
  }
  return target;
}


export function substract(target, ...sources) {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      delete target[key];
    }
  }
  return target;
}
