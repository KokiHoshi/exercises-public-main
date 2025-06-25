import { escapeStringIfElse, escapeStringSwitch } from './index.js';

describe('escapeString functions', () => {
  const cases = [
    { input: 'abc', expected: 'abc' },
    { input: '\0', expected: '\\0' },
    { input: '\b', expected: '\\b' },
    { input: '\t', expected: '\\t' },
    { input: '\n', expected: '\\n' },
    { input: '\v', expected: '\\v' },
    { input: '\f', expected: '\\f' },
    { input: '\r', expected: '\\r' },
    { input: '"', expected: '\\"' },
    { input: "'", expected: "\\'" },
    { input: '\\', expected: '\\\\' },
    { input: 'a\tb\nc"\'\\\0', expected: 'a\\tb\\nc\\"\\\'\\\\\\0' },
  ];

  describe('escapeStringIfElse', () => {
    cases.forEach(({ input, expected }) => {
      test(`escapeStringIfElse(${JSON.stringify(input)}) → ${JSON.stringify(expected)}`, () => {
        expect(escapeStringIfElse(input)).toBe(expected);
      });
    });
  });

  describe('escapeStringSwitch', () => {
    cases.forEach(({ input, expected }) => {
      test(`escapeStringSwitch(${JSON.stringify(input)}) → ${JSON.stringify(expected)}`, () => {
        expect(escapeStringSwitch(input)).toBe(expected);
      });
    });
  });

  test('both implementations produce the same result for complex input', () => {
    const str = 'Line1\nLine2\tTabbed\\Quote"\'\0';
    expect(escapeStringIfElse(str)).toBe(escapeStringSwitch(str));
  });
});
