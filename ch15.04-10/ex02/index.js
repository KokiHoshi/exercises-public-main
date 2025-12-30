const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    // IMPORTANT: ChatGPT にはこの関数内のコードのみ変更してもらうこと

    // 完了時：文字を薄く＋打ち消し線、背景も少し変える（Tailwindユーティリティを直接付け外し）
    label.classList.toggle("line-through", toggle.checked);
    label.classList.toggle("text-slate-400", toggle.checked);

    li.classList.toggle("bg-slate-50", toggle.checked);
    li.classList.toggle("border-slate-200", toggle.checked);

    // ついでに視認性UP：未完了の時は通常色に戻す（toggleは上のtoggleで戻る）
    label.classList.toggle("text-slate-900", !toggle.checked);
  });

  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
