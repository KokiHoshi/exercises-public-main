/**
 * @jest-environment jsdom
 */

import "./index.js";

function createInlineCircle() {
  const el = document.createElement("inline-circle");
  document.body.appendChild(el);
  return el;
}

function getCircleSpan(el) {
  const shadow = el.shadowRoot;
  expect(shadow).not.toBeNull();
  const span = shadow.querySelector("span");
  expect(span).not.toBeNull();
  return span;
}

describe("<inline-circle>", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("カスタム要素として定義されている", () => {
    expect(customElements.get("inline-circle")).toBeDefined();
  });

  test("observedAttributes に border-color が含まれている", () => {
    const ctor = customElements.get("inline-circle");
    expect(ctor.observedAttributes).toContain("border-color");
  });

  test("Shadow DOM と span が生成され、基本スタイルが設定される", () => {
    const el = createInlineCircle();
    const span = getCircleSpan(el);

    expect(span.style.display).toBe("inline-block");
    expect(span.style.width).toBe("1em");
    expect(span.style.height).toBe("1em");
    expect(span.style.borderRadius).toBe("50%");
    expect(span.style.border).toContain("2px");
    expect(span.style.border).toContain("solid");
    expect(span.style.border).toContain("black");
  });

  test("border-color 属性を設定すると枠線色が反映される", () => {
    const el = createInlineCircle();
    const span = getCircleSpan(el);

    el.setAttribute("border-color", "red");
    expect(span.style.borderColor).toBe("red");
  });

  test("border-color 属性を変更すると枠線色が更新される", () => {
    const el = createInlineCircle();
    const span = getCircleSpan(el);

    el.setAttribute("border-color", "red");
    expect(span.style.borderColor).toBe("red");

    el.setAttribute("border-color", "blue");
    expect(span.style.borderColor).toBe("blue");
  });

  test("関係ない属性を変更しても枠線色は変わらない", () => {
    const el = createInlineCircle();
    const span = getCircleSpan(el);

    el.setAttribute("border-color", "red");
    expect(span.style.borderColor).toBe("red");

    el.setAttribute("data-anything", "x");
    expect(span.style.borderColor).toBe("red");
  });
});
