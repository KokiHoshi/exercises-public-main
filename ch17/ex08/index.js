/* global React, ReactDOM */
const { useState } = React;
const h = React.createElement;

function TodoApp() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = inputText.trim();
    if (title === "") {
      return;
    }

    setTodos((prev) => [{ id: crypto.randomUUID(), title, done: false }, ...prev]);
    setInputText("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return h(
    "main",
    null,
    h(
      "form",
      { id: "new-todo-form", onSubmit: handleSubmit },
      h("input", {
        type: "text",
        id: "new-todo",
        placeholder: "What needs to be done?",
        value: inputText,
        onChange: (event) => setInputText(event.target.value),
      }),
      h("button", { type: "submit" }, "Add")
    ),
    h(
      "ul",
      { id: "todo-list" },
      ...todos.map((todo) =>
        h(
          "li",
          { key: todo.id },
          h(
            "div",
            null,
            h("input", {
              type: "checkbox",
              checked: todo.done,
              onChange: () => toggleTodo(todo.id),
            }),
            h(
              "label",
              { style: { textDecorationLine: todo.done ? "line-through" : "none" } },
              todo.title
            ),
            h("button", { onClick: () => removeTodo(todo.id) }, "❌")
          )
        )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(h(TodoApp));
