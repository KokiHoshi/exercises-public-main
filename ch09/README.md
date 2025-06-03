# 練習問題: 9 章

## 問題 9.1 💻📄

与えられたテストケースを満たすクラス C を作成しなさい。

```ts
import { C } from "./index.js"; // ts でも可

test("class puzzle", () => {
  expect(C.method()).toBe(1);
  expect(new C().method()).toBe(2);
  expect(C.C.method()).toBe(3);
  expect(new C.C().method()).toBe(4);
  expect(new C().C.method()).toBe(5);
  expect(new new C().C().method()).toBe(6);
});
```

**出題範囲**: 9.3.1

## 問題 9.2 💻📄

値を読み出す度にその値が 1 ずつ増えていくフィールドを持つクラスを作りなさい。
そのフィールドの初期値は 0 とします。

```ts
import { C } from "./index.js"; // ts でも可

test("", () => {
  const c = new C();
  expect(c.x).toBe(0);
  expect(c.x).toBe(1);
  expect(c.x).toBe(2);
});
```

**出題範囲**: 9.3.2

## 問題 9.3 💻🧪

以下のクラス実装では、外部からフィールド x に直接アクセスできてしまいます。

```ts
class C {
  x = 42;

  getX() {
    return this.x;
  }
}
```

`x` をプライベートフィールドにすることで、外部から `x` にアクセスできないようにしなさい。

また、プライベートフィールドのかわりにクロージャを使うことで、外部から `x` にアクセスできないようにしなさい。

**出題範囲**: 9.3.3

## 問題 9.4 💻 🧪

以下の仕様に基づいて RPG の戦士クラスと魔力を持った戦士である魔法戦士クラスをそれぞれ `class` を使った記法と `prototype` を使った記法で実装しなさい。

仕様

- 戦士は攻撃力 `atk` フィールドを持つ
- 戦士は攻撃 `attack` メソッドを持つ
- `attack` メソッドはそのインスタンスの `atk` の 2 倍の値をダメージとして返す
- 魔法戦士は戦士を継承する
- 魔法戦士は魔力 `mgc` フィールドを持つ
- 魔法戦士の `attack` は戦士としての `attack` の値にそのインスタンスの `mgc` の値を加算した値をダメージとして返す

**出題範囲**: 9.5.1

## 問題 9.5

`instanceof`と等価な関数 `instanceOf(object, constructor)`を作成しなさい。
関数内部での `instanceof` の利用は不可。

作成した関数に対してテストを作成しなさい。
テストケースには少なくとも以下を含むこと。

- 多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース
- 継承関係にないインスタンスとクラスのコンストラクタを入力するケース

**出題範囲**: 9.5.2

## 問題 9.6 💻 🧪

例 9-6 の `TypedMap` を継承ではなくコンポジションを使って書き換えなさい。処理を完全に Map に委譲するメソッドはテストを省略してもよい。

**出題範囲**: 9.5.3

## 問題 9.7 💻

継承を使う場合、サブクラスがスーパークラスの実装を引き継ぐため、クラス間の依存性が強くなる。これにより、特に大きい継承ツリーでは、あるクラスの変更がほかのクラスに影響を与えたり、無理にコードを共通化することで、不要な振る舞いや属性を持ったクラスができるという問題がある。

以下は `Animal` クラスを継承して様々な動物クラスを実装する例である。

```ts
class Animal {
  eat() {
    ...
  }
}

class Dog extends Animal {
  bite() {
    ...
  }
}

class Husky extends Dog {
  ...
}

class Cat extends Animal {
  scratch() {
    ...
  }
}

class Bird extends Animal {
  fly() {
    ...
  }
}

class Fish extends Animal {
  swim() {
    ...
  }
}
```

この例では動物として共通の"食べる"という振る舞い `eat()` を各動物が継承する。ここに"鳴く"という振る舞い `makeSound()` を追加することを考える。犬、猫、鳥は鳴くので `makeSound()` を共通の振る舞いとして利用したいが、スーパークラスに `makeSound()` を追加すると `Fish` は不要な振る舞いを持つことになる。

継承のかわりに合成(composition)を用いてこの問題を回避しなさい。

**出題範囲**: 9.5.3

## 問題 9.8 💻 🧪

以下の図は、ある目覚まし時計の状態遷移をモデル化した状態遷移図である。

```plantuml
[*] -> 通常
通常 -> アラームセット中: アラーム設定
アラームセット中 -> 通常: アラーム解除
アラームセット中 --> アラーム鳴動中: アラーム設定時刻到達
アラーム鳴動中 --> 通常: アラーム解除
アラーム鳴動中 --> スヌーズ中: スヌーズ
スヌーズ中 --> アラーム鳴動中: スヌーズ設定時間経過
スヌーズ中 --> 通常: アラーム解除
```

この状態遷移を管理するコード例として、以下のようなクラスが考えられる。
`AlarmClock` インスタンスに対して、各イベントに対応するメソッドを呼び出すと、内部で状態遷移が発生し、実行すべきアクションを返り値として返す。

```ts
// 目覚まし時計の状態
type State =
  | "normal" // 通常
  | "alarmSet" // アラームセット中
  | "alarmSounding" // アラーム鳴動中
  | "snoozing"; // スヌーズ中

// イベント時に発生するアクション
type Action =
  | "none" // 何もしない
  | "soundAlarm" // アラームを鳴らす
  | "stopAlarm"; // アラームを止める

// 目覚まし時計クラス
class AlarmClock {
  private state: State;

  constructor() {
    this.state = "normal";
  }

  // アラーム設定イベント
  setAlarm(): Action {
    switch (this.state) {
      case "normal":
        this.state = "alarmSet";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム解除イベント
  cancelAlarm(): Action {
    switch (this.state) {
      case "alarmSet":
        this.state = "normal";
        return "none";
      case "alarmSounding":
        this.state = "normal";
        return "stopAlarm";
      case "snoozing":
        this.state = "normal";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム設定時刻到達イベント
  reachedToAlarmTime(): Action {
    switch (this.state) {
      case "alarmSet":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }

  // スヌーズイベント
  snooze(): Action {
    switch (this.state) {
      case "alarmSounding":
        this.state = "snoozing";
        return "stopAlarm";
      default:
        return "none";
    }
  }

  // スヌーズ設定時間経過イベント
  elapseSnoozeTime(): Action {
    switch (this.state) {
      case "snoozing":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }
}
```

このコードに対して、すべての状態遷移を網羅するテストを作成することを考える。
例えば `アラームセット中` の状態から各イベントを受け取ったときのテストを作成するには、事前条件として毎回 `通常` 状態から、`アラーム設定` と `アラーム設定時刻到達` のイベントを経て `アラームセット中` の状態に遷移させる必要がある。
これを各状態のテストに対して実施するのは煩雑である。

この目覚まし時計の状態遷移モデルのテスト性を向上させるためのアプローチとしてどのような方法があるか考え、それを実装しなさい。
また、作成されたコードに対してすべての状態遷移を検査するテストを作成しなさい。

**出題範囲**: -

## 問題 9.9 💪 🖋️ 💻

オブジェクト指向の設計原則である「SOLID 原則」について説明し、各原則を満たす例と満たさない例のコードを作成しなさい。
コードは各原則を説明するためのスケルトンコードで良く、実際に動作する必要はない。

**出題範囲**: -
