import { safeJsonParse } from './index.js';

describe('safeJsonParse', () => {
  it('有効なJSON文字列（オブジェクト）を正しくパースする', () => {
    const validJsonObject = '{"name": "太郎", "age": 30}';
    const result = safeJsonParse(validJsonObject);
    expect(result).toEqual({ success: true, data: { name: '太郎', age: 30 } });
  });

  it('有効なJSON文字列（配列）を正しくパースする', () => {
    const validJsonArray = '[1, 2, 3]';
    const result = safeJsonParse(validJsonArray);
    expect(result).toEqual({ success: true, data: [1, 2, 3] });
  });

  it('空の文字列に対してエラーを返す', () => {
    const emptyString = '';
    const result = safeJsonParse(emptyString);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Unexpected end of JSON input/);
  });

  it('null のJSON文字列を正しくパースする', () => {
    const nullString = 'null';
    const result = safeJsonParse(nullString);
    expect(result).toEqual({ success: true, data: null });
  });

  it('数値のJSON文字列を正しくパースする', () => {
    const numberString = '123';
    const result = safeJsonParse(numberString);
    expect(result).toEqual({ success: true, data: 123 });
  });

  it('真偽値のJSON文字列を正しくパースする', () => {
    const trueString = 'true';
    const resultTrue = safeJsonParse(trueString);
    expect(resultTrue).toEqual({ success: true, data: true });

    const falseString = 'false';
    const resultFalse = safeJsonParse(falseString);
    expect(resultFalse).toEqual({ success: true, data: false });
  });

});
