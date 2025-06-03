import { convertLFtoCRLF, convertCRLFtoLF } from './index.js';

describe('改行コード変換', () => {
  test('LF to CRLF', () => {
    const input = 'line1\nline2\nline3';
    const expected = 'line1\r\nline2\r\nline3';
    expect(convertLFtoCRLF(input)).toBe(expected);
  });

  test('CRLF to LF', () => {
    const input = 'line1\r\nline2\r\nline3';
    const expected = 'line1\nline2\nline3';
    expect(convertCRLFtoLF(input)).toBe(expected);
  });

  test('LF to CRLF to LF', () => {
    const input = 'line1\nline2\nline3';
    const converted = convertLFtoCRLF(input);
    const restored = convertCRLFtoLF(converted);
    expect(restored).toBe(input);
  });
});
