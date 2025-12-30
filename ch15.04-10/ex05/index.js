class InlineCircle extends HTMLElement {
  static get observedAttributes() {
    return ["border-color"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    this.circle = document.createElement("span");
    this.circle.style.display = "inline-block";
    this.circle.style.width = "1em";
    this.circle.style.height = "1em";
    this.circle.style.borderRadius = "50%";
    this.circle.style.border = "2px solid black";

    shadow.append(this.circle);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "border-color") {
      this.circle.style.borderColor = newValue;
    }
  }
}

customElements.define("inline-circle", InlineCircle);
