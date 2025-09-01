class C {
  //C.method() -> 1
  static method() {
    return 1;
  }
  //new C().method() -> 2
  method() {
    return 2;
  }
  static C = class {
    //C.C.method() -> 3
    static method() {
      return 3;
    }
    //new C.C().method() -> 4
    method() {
      return 4;
    }
  };
  C = class {
    //new C().C.method() -> 5
    static method() {
      return 5;
    }
    // new new C().C().method() -> 6
    method() {
      return 6;
    }
  };
}

export { C };