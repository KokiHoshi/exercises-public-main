const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const API_BASE = "http://localhost:3001";

// 15.11-15.3: CORS + クロスオリジン Cookie 送信を許可する fetch オプション
function corsOptions(options = {}) {
  return {
    mode: "cors",
    credentials: "include",
    ...options,
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("document.cookie =", document.cookie);

  try {
    // タスク一覧を取得
    const response = await fetch(`${API_BASE}/api/tasks`, corsOptions());

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.message}`);
      return;
    }

    const data = await response.json();
    data.items.forEach((task) => {
      appendToDoItem(task);
    });
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

form.addEventListener("submit", async (e) => {
  // フォームのデフォルト送信動作（ページリロード）を防ぐため
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  input.value = "";

  try {
    // 新しいタスクを作成
    const response = await fetch(
      `${API_BASE}/api/tasks`,
      corsOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ name: todo }),
      }),
    );

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.message}`);
      return;
    }

    const task = await response.json();
    appendToDoItem(task);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  // toggle が変化 (change) した際に API を呼び出してタスクの状態を更新
  toggle.addEventListener("change", async () => {
    const newStatus = toggle.checked ? "completed" : "active";

    try {
      const response = await fetch(
        `${API_BASE}/api/tasks/${task.id}`,
        corsOptions({
          method: "PATCH",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ status: newStatus }),
        }),
      );

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        // エラー時は元の状態に戻す
        toggle.checked = !toggle.checked;
        return;
      }

      const updated = await response.json();
      label.style.textDecorationLine =
        updated.status === "completed" ? "line-through" : "none";
      toggle.checked = updated.status === "completed";
    } catch (error) {
      alert(`Error: ${error.message}`);
      toggle.checked = !toggle.checked;
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";

  // destroy がクリック (click) された場合に API を呼び出してタスクを削除
  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(
        `${API_BASE}/api/tasks/${task.id}`,
        corsOptions({
          method: "DELETE",
        }),
      );

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }

      elem.remove();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
