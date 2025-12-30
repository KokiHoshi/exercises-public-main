const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

// 変更：renderTodos の引数は「todoそのもの」ではなく「{todo, index}」の配列にする
function renderTodos(items) {
  list.innerHTML = "";
  items.forEach(({ todo, index }) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);

    // 変更：todos[index] を更新して、現在のフィルタで再描画する
    toggle.addEventListener("change", () => {
      todos[index].completed = toggle.checked;
      renderFiltered(); // 追加
    });

    label.textContent = todo.content;
    toggle.checked = todo.completed;

    // 変更：削除も todos[index] を消して、現在のフィルタで再描画する
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderFiltered(); // 追加
    });

    list.appendChild(li);
  });
}

// 追加：現在の hash に応じてフィルタして描画する関数
function renderFiltered() {
  const hash = window.location.hash;

  // 重要：元の todos の index を保持したまま表示用配列を作る
  const indexed = todos.map((todo, index) => ({ todo, index }));

  if (hash === "#/active") {
    renderTodos(indexed.filter(({ todo }) => !todo.completed));
  } else if (hash === "#/completed") {
    renderTodos(indexed.filter(({ todo }) => todo.completed));
  } else {
    renderTodos(indexed); // All
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });

  // 変更：renderTodos(todos) ではなく、現在のフィルタで描画
  renderFiltered();
});

window.addEventListener("hashchange", () => {
  // ここを実装してね
  renderFiltered(); // ★追加
});

// 追加：初期表示（リロード直後にhashがあっても反映）
renderFiltered();
