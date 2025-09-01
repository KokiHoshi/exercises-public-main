export class C {
    #n = 0;
    
    get x() {
      // 読み出すたびに現在値を返し、内部状態を +1
      return this.#n++;
    }
  }
  