function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}

const bar = (t) => console.log("\n---------------------\n" + t);

// イテレータ
// next()
bar("イテレータ: next()");
{
  const it = counterIter(3);
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());
}

// return()
bar("イテレータ: return()");
{
  const it = counterIter(3);
  console.log(it.next());
  console.log(it.return("終了"));
}

// throw()
bar("イテレータ: throw()");
{
  const it = counterIter(3);
  try {
    it.throw(new Error("エラー発生"));
  } catch (e) {
    console.error("caught:", e.message);
  }
}

// for-of
bar("イテレータ: for-of");
{
  for (const v of counterIter(3)) {
    console.log("body:", v);
  }
}

// イテレータ: for-of 途中でbreak
bar("イテレータ: for-of 途中でbreak");
{
  for (const v of counterIter(5)) {
    console.log("body:", v);
    if (v === 2) break;
  }
}

// イテレータ: for-of 中に例外
{
  try {
    for (const v of counterIter(5)) {
      console.log("body:", v);
      if (v === 2) throw new Error("ループ内エラー");
    }
  } catch (e) {
    console.error("caught:", e.message);
  }
}

// ジェネレータ
// next()
bar("イテレータ: next()");
{
  const gen = counterGen(3);
  console.log(gen.next());
  console.log(gen.next());
  console.log(gen.next());
  console.log(gen.next());
}

// return()
bar("イテレータ: return()");
{
  const gen = counterGen(3);
  console.log(gen.next());
  console.log(gen.return("終了"));
}

// throw()
bar("イテレータ: throw()");
{
  const gen = counterGen(3);
  console.log(gen.next());
  try {
    gen.throw(new Error("エラー発生"));
  } catch (e) {
    console.error("caught:", e.message);
  }
}

// for-of
bar("イテレータ: for-of");
{
  for (const v of counterGen(3)) {
    console.log("body:", v);
  }
}

// イテレータ: for-of 途中でbreak
bar("イテレータ: for-of 途中でbreak");
{
  for (const v of counterGen(5)) {
    console.log("body:", v);
    if (v === 2) break;
  }
}

// イテレータ: for-of 中に例外
{
  try {
    for (const v of counterGen(5)) {
      console.log("body:", v);
      if (v === 2) throw new Error("ループ内エラー");
    }
  } catch (e) {
    console.error("caught:", e.message);
  }
}
