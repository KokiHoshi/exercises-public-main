class DefaultMap extends Map{
    constructor(defaultValue) {
        super(); // 親クラスのコンストラクタを呼び出す
        this.defaultValue = defaultValue; // デフォルト値を記憶する
    }

    get(key) {
        if (this.has(key)) { // マップ中にキーが存在すれば
            return super.get(key); // 親クラス中の値を返す
        }
        else {
            return this.defaultValue; // 存在しなければデフォルト値を返す
        }
    }
}

// このクラスは文字頻度ヒストグラムを計算し表示する
class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0); // 文字と文字数をマップする
        this.totalLetters = 0; // 全体の文字数
    }

    // この関数はtext中の文字でヒストグラムを更新する
    add(text) {
        // テキストから空白文字を取り除き全ての文字を大文字に変換する
        text = text.replace(/\s/g, "").toUpperCase();

        // テキスト中の文字をループする
        for(let character of text) {
            let count = this.letterCounts.get(character); // 直前の値を取得する
            this.letterCounts.set(character, count+1); // 1増やす
            this.totalLetters++;
        }
    }

    // ヒストグラムを文字列に変換して、ASCIIグラフィックとして表示
    toString() {
        // マップを[キー,文字数]配列に変換
        let entries = [...this.letterCounts];

        // 文字数順にソートする。文字数が同じ場合はアルファベット順でソートする
        entries.sort((a,b) => { // ソート順を定義する関数
            if (a[1] === b[1]) { // 文字数が同じ場合
                return a[0] < b[0] ? -1 : 1; // アルファベット順でソート
            } else { // 文字数が異なる場合
                return b[1] - a[1]; // 降順でソート
            }
        });

        // 文字数をパーセントに変換
        for(let entry of entries) {
            entry[1] = entry[1] / this.totalLetters * 100;
        }

        // 1%未満の文字は表示しない
        entries = entries.filter(entry => entry[1] >= 1);

        // 各項目を一行のテキストに変換する
        let lines = entries.map(
            ([l,n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        );

        // 各行を改行文字で区切って結合し、結合した文字数を返す。
        return lines.join("\n");
    }
}

//Histogramオブジェクトを生成
//標準入力からテキストを非同期に読み出し、読み出したテキストをヒストグラムに追加
//テキストを最後まで読み出したらヒストグラムを返す
async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8"); // Unicode文字列を読む
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}

// 標準入力からHistogramオブジェクトを生成、ヒストグラムを表示
histogramFromStdin().then(histogram => {console.log(histogram.toString());
});