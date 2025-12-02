import { template } from "./index.js";

describe("template tag function", () => {
  test("empty template literal", () => {
    expect(template``).toBe("");
  });

  test("no interpolation", () => {
    expect(template`test`).toBe("test");
  });

  test("single interpolation", () => {
    expect(template`Hello, ${"A"}`).toBe("Hello, string");
  });

  test("multiple interpolations", () => {
    expect(template`${1} ${null} ${() => {}}`).toBe("number object function");
  });

  test("interpolation within text", () => {
    expect(template`type of 'A' is ${"A"}`).toBe("type of 'A' is string");
  });

  test("complex mixed example", () => {
    const fn = () => {};
    expect(template`X=${10}, Y=${fn}, Z=${undefined}`).toBe(
      "X=number, Y=function, Z=undefined"
    );
  });
});
