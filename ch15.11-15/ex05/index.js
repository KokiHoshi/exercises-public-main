const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

/**
 * 1件分の todo 要素(li)を作る
 * @param {{ id:number, title:string, completed:boolean }} todo
 * @returns {HTMLLIElement}
 */

const DB_NAME = "TodoDB";
const DB_VERSION = 1;
const STORE_NAME = "todos";

let db;

const channel = new BroadcastChannel("todo-channel");
const CLIENT_ID = crypto.randomUUID();

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// DB初期化を「待てるPromise」にしておく（テスト高速操作でも安全）
const dbReady = openDB().then((opened) => {
  db = opened;
  return db;
});

function getAllTodos() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function addTodoToDB(title) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.add({ title, completed: false });

    req.onsuccess = () => {
      const id = req.result;
      resolve({ id, title, completed: false });
    };
    req.onerror = () => reject(req.error);
  });
}

function updateTodoInDB(id, patch) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const current = getReq.result;
      if (!current) {
        reject(new Error("Todo not found"));
        return;
      }
      const next = { ...current, ...patch };
      const putReq = store.put(next);
      putReq.onsuccess = () => resolve(next);
      putReq.onerror = () => reject(putReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

function deleteTodoFromDB(id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function notifyChanged() {
  channel.postMessage({ type: "changed", clientId: CLIENT_ID });
}

function clearList() {
  list.innerHTML = "";
}

function renderAll(todos) {
  clearList();
  for (let i = 0; i < todos.length; i++) {
    appendTodoItem(todos[i]);
  }
}

async function reloadFromDB() {
  const todos = await getAllTodos();
  renderAll(todos);
}

document.addEventListener("DOMContentLoaded", async () => {
  // DBが開いてから描画
  await dbReady;
  await reloadFromDB();
});

channel.onmessage = async (e) => {
  const { type, clientId } = e.data || {};
  if (clientId === CLIENT_ID) return;
  if (type === "changed") {
    // DB未準備の可能性を潰す
    await dbReady;
    await reloadFromDB();
  }
};

function appendTodoItem(todoObj) {
  const elem = document.createElement("li");
  elem.dataset.id = String(todoObj.id);

  const label = document.createElement("label");
  label.textContent = todoObj.title;
  label.style.textDecorationLine = todoObj.completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todoObj.completed;

  toggle.addEventListener("change", async () => {
    // DBが使える状態にしてから更新
    await dbReady;

    elem.dataset.saving = "true";
    try {
      const updated = await updateTodoInDB(todoObj.id, {
        completed: toggle.checked,
      });
      label.style.textDecorationLine = updated.completed
        ? "line-through"
        : "none";
      notifyChanged();
    } catch (err) {
      toggle.checked = !toggle.checked;
    } finally {
      delete elem.dataset.saving;
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";

  destroy.addEventListener("click", async () => {
    // DBが使える状態にしてから削除
    await dbReady;

    elem.dataset.saving = "true";
    try {
      await deleteTodoFromDB(todoObj.id);
      elem.remove();
      notifyChanged();
    } catch (err) {
      // no-op
    } finally {
      delete elem.dataset.saving;
    }
  });

  const container = document.createElement("div");
  container.appendChild(toggle);
  container.appendChild(label);
  container.appendChild(destroy);

  elem.appendChild(container);
  list.prepend(elem);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (input.value.trim() === "") return;

  const todo = input.value.trim();
  input.value = "";

  await dbReady;

  try {
    const saved = await addTodoToDB(todo);
    appendTodoItem(saved);
    notifyChanged();
  } catch (err) {
    // no-op（必要なら alert）
  }
});
