import { Warrior, MagicWarrior, PWarrior, PMagicWarrior } from './index.js';

describe('class 記法', () => {
  test('Warrior.attack は atk の2倍を返す', () => {
    const w = new Warrior(10);
    expect(w.attack()).toBe(20);
  });

  test('MagicWarrior.attack は Warrior の攻撃値 + mgc', () => {
    const m = new MagicWarrior(10, 5);
    expect(m.attack()).toBe(25);
  });

  test('継承関係が成り立つ (instanceof)', () => {
    const m = new MagicWarrior(7, 3);
    expect(m).toBeInstanceOf(MagicWarrior);
    expect(m).toBeInstanceOf(Warrior);
  });

  test('メソッドはインスタンスのプロパティにはならない', () => {
    const w = new Warrior(1);
    expect(Object.hasOwn(Warrior.prototype, 'attack')).toBe(true);
    expect(Object.hasOwn(w, 'attack')).toBe(false);
  });
});

describe('prototype 記法', () => {
  test('PWarrior.attack は atk の2倍を返す', () => {
    const pw = new PWarrior(8);
    expect(pw.attack()).toBe(16);
  });

  test('PMagicWarrior.attack は PWarrior の攻撃値 + mgc', () => {
    const pm = new PMagicWarrior(8, 3);
    expect(pm.attack()).toBe(19);
  });

  test('プロトタイプ継承が成り立つ', () => {
    const pm = new PMagicWarrior(5, 2);
    expect(pm).toBeInstanceOf(PMagicWarrior);
    expect(pm).toBeInstanceOf(PWarrior);
    expect(Object.getPrototypeOf(PMagicWarrior.prototype)).toBe(PWarrior.prototype);
  });
});
