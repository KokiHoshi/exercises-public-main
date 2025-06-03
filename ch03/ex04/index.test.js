describe("hundredPointsSymbol", () => {
    const emoji = "💯";
  
    test("check 💯 length", () => {
      expect(emoji.length).toBe(2);
    });
  
    test("same utf-16", () => {
      const utf16 = "\uD83D\uDCAF";
      expect(emoji).toBe(utf16);
    });
  
    test("same utf-32", () => {
      const utf32 = "\u{1F4AF}";
      expect(emoji).toBe(utf32);
    });
  });
  