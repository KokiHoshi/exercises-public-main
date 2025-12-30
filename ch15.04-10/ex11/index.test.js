/**
 * @jest-environment jsdom
 */

function setupDom() {
  document.body.innerHTML = `
    <main>
      <form id="new-todo-form">
        <input type="text" id="new-todo" />
        <button>Add</button>
      </form>
      <ul id="todo-list"></ul>
    </main>
    <footer>
      <li><a href="#/">All</a></li>
      <li><a href="#/active">Active</a></li>
      <li><a href="#/completed">Completed</a></li>
    </footer>

    <template id="todo-template">
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="content"></label>
          <button class="destroy">❌</button>
        </div>
      </li>
    </template>
  `;
}

// ★ESM環境でモジュールキャッシュを避けるため、クエリを付けて毎回別モジュールとして読み込む
async function loadAppModuleFresh() {
  await import(`./index.js?cacheBust=${Math.random()}`);
}

function submitTodo(text) {
  const input = document.querySelector("#new-todo");
  const form = document.querySelector("#new-todo-form");
  input.value = text;
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
}

function setHash(hash) {
  window.location.hash = hash;
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function getItems() {
  return Array.from(document.querySelectorAll("#todo-list li"));
}

function getItemTexts() {
  return getItems().map((li) => li.querySelector("label.content").textContent);
}

describe("ex11 ToDo filter app", () => {
  beforeEach(async () => {
    setupDom();
    window.location.hash = "#/";
    await loadAppModuleFresh();
  });

  test("add todos and show All", () => {
    submitTodo("A");
    submitTodo("B");
    expect(getItemTexts()).toEqual(["A", "B"]);
  });

  test("Active filter shows only incomplete", () => {
    submitTodo("A");
    submitTodo("B");

    // A を完了にする
    const firstToggle = document.querySelectorAll("input.toggle")[0];
    firstToggle.checked = true;
    firstToggle.dispatchEvent(new Event("change", { bubbles: true }));

    setHash("#/active");
    expect(getItemTexts()).toEqual(["B"]);
  });

  test("Completed filter shows only completed", () => {
    submitTodo("A");
    submitTodo("B");

    // B を完了にする
    const toggles = document.querySelectorAll("input.toggle");
    toggles[1].checked = true;
    toggles[1].dispatchEvent(new Event("change", { bubbles: true }));

    setHash("#/completed");
    expect(getItemTexts()).toEqual(["B"]);
  });

  test("toggle completion in Active view updates list immediately", () => {
    submitTodo("A");

    setHash("#/active");
    expect(getItemTexts()).toEqual(["A"]);

    // Active表示中に完了にする → Activeから消える
    const toggle = document.querySelector("input.toggle");
    toggle.checked = true;
    toggle.dispatchEvent(new Event("change", { bubbles: true }));

    expect(getItems().length).toBe(0);
  });

  test("delete in Completed view updates list immediately", () => {
    submitTodo("A");
    submitTodo("B");

    // Aを完了
    const toggles = document.querySelectorAll("input.toggle");
    toggles[0].checked = true;
    toggles[0].dispatchEvent(new Event("change", { bubbles: true }));

    setHash("#/completed");
    expect(getItemTexts()).toEqual(["A"]);

    // Completed表示中に削除 → Completedから消える
    const destroy = document.querySelector("button.destroy");
    destroy.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(getItems().length).toBe(0);

    // Allに戻すと B だけ残ってる
    setHash("#/");
    expect(getItemTexts()).toEqual(["B"]);
  });
});
