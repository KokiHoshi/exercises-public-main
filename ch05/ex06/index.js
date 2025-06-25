function testTryCatchFinally() {
    console.log("start");
  
    try {
      console.log("in try");
      throw new Error("something went wrong");
    } catch (e) {
      console.log("in catch:", e.message);
    } finally {
      console.log("in finally");
    }
  
    console.log("end");
  }
  
  testTryCatchFinally();
  