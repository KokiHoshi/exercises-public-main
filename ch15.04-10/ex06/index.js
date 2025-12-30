const template = document.createElement("template");
template.innerHTML = `\
<style>
  :host {
    display: block;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    padding: 16px;
  }
  form {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  input[type="text"] {
    flex: 1;
    padding: 8px 10px;
    font-size: 14px;
  }
  button {
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 6px;
    border-bottom: 1px solid #ddd;
  }
  .text {
    flex: 1;
  }
  .completed .text {
    text-decoration: line-through;
    opacity: 0.7;
  }
  .destroy {
    border: none;
    background: transparent;
    font-size: 18px;
    line-height: 1;
  }
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>

<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");

    // state: [{ id, text, completed }]
    this.todos = [];
    this.storageKey = "todo-app-web-components-ex06";

    // 追加（form submit）
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = this.input.value.trim();
      if (!text) return;

      this.addTodo(text);
      this.input.value = "";
      this.input.focus();
    });

    // クリックのイベント委譲（完了トグル・削除）
    this.list.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li) return;
      const id = li.dataset.id;

      // 削除ボタン
      if (e.target.closest(".destroy")) {
        this.removeTodo(id);
        return;
      }

      // チェックボックス or 行クリックでトグル
      if (
        e.target.matches('input[type="checkbox"]') ||
        e.target.closest(".text")
      ) {
        this.toggleTodo(id);
      }
    });

    // チェックボックス change（キーボード操作も拾える）
    this.list.addEventListener("change", (e) => {
      if (!e.target.matches('input[type="checkbox"]')) return;
      const li = e.target.closest("li");
      if (!li) return;
      this.setCompleted(li.dataset.id, e.target.checked);
    });
  }

  connectedCallback() {
    this.load();
    this.render();
    this.input?.focus();
  }

  // ---- persistence ----
  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      this.todos = raw ? JSON.parse(raw) : [];
    } catch {
      this.todos = [];
    }
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  // ---- actions ----
  addTodo(text) {
    const todo = {
      id: crypto?.randomUUID
        ? crypto.randomUUID()
        : String(Date.now() + Math.random()),
      text,
      completed: false,
    };
    this.todos.push(todo);
    this.save();
    this.render();
  }

  toggleTodo(id) {
    const t = this.todos.find((x) => x.id === id);
    if (!t) return;
    t.completed = !t.completed;
    this.save();
    this.render();
  }

  setCompleted(id, completed) {
    const t = this.todos.find((x) => x.id === id);
    if (!t) return;
    t.completed = completed;
    this.save();
    this.render();
  }

  removeTodo(id) {
    this.todos = this.todos.filter((x) => x.id !== id);
    this.save();
    this.render();
  }

  // ---- view ----
  render() {
    this.list.innerHTML = "";

    for (const todo of this.todos) {
      const li = document.createElement("li");
      li.dataset.id = todo.id;
      if (todo.completed) li.classList.add("completed");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      const text = document.createElement("span");
      text.className = "text";
      text.textContent = todo.text;

      const destroy = document.createElement("button");
      destroy.className = "destroy";
      destroy.type = "button";
      destroy.setAttribute("aria-label", "Delete");
      destroy.textContent = "×";

      li.append(checkbox, text, destroy);
      this.list.appendChild(li);
    }
  }
}

customElements.define("todo-app", TodoApp);
