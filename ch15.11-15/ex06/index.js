const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const STORAGE_KEY = "todos";

// sessionStorage が使えるか判定
function isStorageAvailable() {
  try {
    const testKey = "__test__";
    sessionStorage.setItem(testKey, "1");
    sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const canUseStorage = isStorageAvailable();

// Todo データ
let todos = [];

// 保存 / 読み込み
function loadTodos() {
  if (!canUseStorage) return;
  const json = sessionStorage.getItem(STORAGE_KEY);
  if (json) {
    todos = JSON.parse(json);
  }
}

function saveTodos() {
  if (!canUseStorage) return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 描画
function renderTodos() {
  list.innerHTML = "";
  todos.forEach(createTodoElement);
}

function createTodoElement(todo) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.title;
  label.style.textDecorationLine = todo.completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.completed;
  toggle.addEventListener("change", () => {
    todo.completed = toggle.checked;
    saveTodos();
    renderTodos();
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    todos = todos.filter((t) => t.id !== todo.id);
    saveTodos();
    renderTodos();
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}

// 初期ロード
loadTodos();
renderTodos();

// 追加処理
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  input.value = "";

  todos.push({
    id: Date.now(),
    title,
    completed: false,
  });

  saveTodos();
  renderTodos();
});

// 他タブからの変更を反映
window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY) {
    todos = e.newValue ? JSON.parse(e.newValue) : [];
    renderTodos();
  }
});
