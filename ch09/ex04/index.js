// class
export class Warrior {
  constructor(atk) {
    this.atk = atk; // 攻撃力
  }
  attack() {
    return this.atk * 2; // 戦士の攻撃: atk の2倍
  }
}

export class MagicWarrior extends Warrior {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc; // 魔力
  }
  attack() {
    return super.attack() + this.mgc; // 戦士攻撃値 + mgc
  }
}

// prototype
export function PWarrior(atk) {
  this.atk = atk;
}
PWarrior.prototype.attack = function () {
  return this.atk * 2;
};

export function PMagicWarrior(atk, mgc) {
  PWarrior.call(this, atk); // 親コンストラクタ継承
  this.mgc = mgc;
}
PMagicWarrior.prototype = Object.create(PWarrior.prototype);
PMagicWarrior.prototype.constructor = PMagicWarrior;
PMagicWarrior.prototype.attack = function () {
  return PWarrior.prototype.attack.call(this) + this.mgc;
};
