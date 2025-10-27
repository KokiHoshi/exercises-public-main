export function* resettableCounter(initial = 0) {
  let n = initial;
  while (true) {
    try {
      yield n++;
    } catch (e) {
      if (e === "reset") {
        n = 0;
        continue;
      }
      throw e;
    }
  }
}
