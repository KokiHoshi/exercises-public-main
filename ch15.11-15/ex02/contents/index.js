const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const loadingOverlay = document.querySelector("#loading-overlay");

// UIロック
function lockUI() {
  loadingOverlay?.classList.add("show");
  form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
  list.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
}

// UIアンロック
function unlockUI() {
  loadingOverlay?.classList.remove("show");
  form.querySelectorAll("input, button").forEach((el) => (el.disabled = false));
  list.querySelectorAll("input, button").forEach((el) => (el.disabled = false));
}

// リトライ対象判定
function isRetryableStatus(status) {
  return [408, 429, 500, 502, 503, 504].includes(status);
}

function fetchWithTimeout(url, options = {}, timeoutMs = 3000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => {
      window.clearTimeout(timeoutId);
    })
    .catch((err) => {
      // AbortController による中断はタイムアウト扱いにする
      if (err?.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw err;
    });
}

function retryWithExponentialBackoff(func, maxRetry = 3) {
  let attempt = 0;

  return new Promise((resolve, reject) => {
    async function tryOnce() {
      attempt++;
      try {
        const response = await func();
        // 成功 or リトライ不要なステータスなら終了
        if (response.ok || !isRetryableStatus(response.status)) {
          resolve(response);
          return;
        }
      } catch (e) {
        // タイムアウト/ネットワークなども失敗扱い（リトライ対象）
      }
      // リトライ上限を超えたら失敗
      if (attempt > maxRetry) {
        reject(new Error("Retry limit exceeded"));
        return;
      }
      // 指数バックオフ（1s, 2s, 4s...）
      const delay = 1000 * Math.pow(2, attempt - 1);
      window.setTimeout(tryOnce, delay);
    }
    // 初回は即時
    window.setTimeout(tryOnce, 0);
  });
}

// wrapper
function fetchWithRetry(url, options = {}) {
  return retryWithExponentialBackoff(() =>
    fetchWithTimeout(url, options, 3000),
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("document.cookie =", document.cookie);

  lockUI();
  try {
    const response = await fetchWithRetry("/api/tasks");

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP ${response.status}`,
      }));
      alert(`Error: ${error.message}`);
      return;
    }

    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task));
  } catch (error) {
    if (error.message === "Request timed out") {
      alert("リクエストがタイムアウトしました");
    } else {
      alert(`Error: ${error.message}`);
    }
  } finally {
    unlockUI();
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === "") return;

  input.value = "";

  lockUI();
  try {
    const response = await fetchWithRetry("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ name: todo }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP ${response.status}`,
      }));
      alert(`Error: ${error.message}`);
      return;
    }

    const task = await response.json();
    appendToDoItem(task);
  } catch (error) {
    if (error.message === "Request timed out") {
      alert("リクエストがタイムアウトしました");
    } else {
      alert(`Error: ${error.message}`);
    }
  } finally {
    unlockUI();
  }
});

function appendToDoItem(task) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  toggle.addEventListener("change", async () => {
    const newStatus = toggle.checked ? "completed" : "active";

    lockUI();
    try {
      const response = await fetchWithRetry(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `HTTP ${response.status}`,
        }));
        alert(`Error: ${error.message}`);
        toggle.checked = !toggle.checked; // 元に戻す
        return;
      }

      const updated = await response.json();
      toggle.checked = updated.status === "completed";
      label.style.textDecorationLine =
        updated.status === "completed" ? "line-through" : "none";
    } catch (error) {
      if (error.message === "Request timed out") {
        alert("リクエストがタイムアウトしました");
      } else {
        alert(`Error: ${error.message}`);
      }
      toggle.checked = !toggle.checked; // 元に戻す
    } finally {
      unlockUI();
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";

  destroy.addEventListener("click", async () => {
    lockUI();
    try {
      const response = await fetchWithRetry(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `HTTP ${response.status}`,
        }));
        alert(`Error: ${error.message}`);
        return;
      }

      elem.remove();
    } catch (error) {
      if (error.message === "Request timed out") {
        alert("リクエストがタイムアウトしました");
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      unlockUI();
    }
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
