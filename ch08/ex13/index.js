function f(input) {
    const g = new Function(`return "Hello, " + ${input}`);
    console.log(g());
  }
  
  // Node のバージョンを読み取り、出力する
  f('(console.log("Node version:", process.version), "world")');
  
  // 任意の環境変数を読み取る（例としてダミーをセット）
  process.env.SECRET = "topsecret";
  f('(console.log("Leaked SECRET:", process.env.SECRET), "world")');
  