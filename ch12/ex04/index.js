export function* integers(start = 2) {
  let i = start;
  while (true) yield i++;
}

export function* filterGen(source, predicate) {
  for (const x of source) if (predicate(x)) yield x;
}

export function* sieve(seq) {
  const { value: p, done } = seq.next();
  if (done) return;
  yield p;
  yield* sieve(filterGen(seq, (n) => n % p !== 0));
}

export function* primes() {
  yield* sieve(integers(2));
}
