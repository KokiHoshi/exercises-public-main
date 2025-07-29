// 独自プロパティを持つオブジェクトリテラル
const parent = {
    name: 'parentObject',
    greet() {
      return `Hello from ${this.name}`;
    }
  };
  
  // parent をプロトタイプに持つ新しいオブジェクトを生成
  const child = Object.create(parent);
  
  // child 自身のプロパティを追加
  child.name = 'childObject';
  
  // Object.getPrototypeOf でプロトタイプ確認
  console.log(Object.getPrototypeOf(child) === parent); // => true
  
  // 動作確認（継承したメソッドが使えるか）
  console.log(child.greet()); // => Hello from childObject
  