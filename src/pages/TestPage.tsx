import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// --- Child: presentational list + add form (props typed per exercise 6) ---
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onAdd: (text: string) => void;
}

function TodoList({ todos, onToggle, onAdd }: TodoListProps) {
  const [draft, setDraft] = useState(""); // primitive → inferred as string

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDraft(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return; // ignore empty submissions
    onAdd(text);
    setDraft("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          className="search"
          value={draft}
          onChange={handleChange}
          placeholder="Add a todo and press Enter…"
        />
      </form>

      {todos.length === 0 ? (
        <p className="muted">No todos yet. Add one above.</p>
      ) : (
        <ul className="post-list">
          {todos.map((t) => (
            <li
              key={t.id}
              className="post-item"
              onClick={() => onToggle(t.id)}
              style={{
                textDecoration: t.done ? "line-through" : "none",
                opacity: t.done ? 0.55 : 1,
              }}
            >
              {t.done ? "✓ " : "○ "}
              {t.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --- Parent: OWNS the state, passes handlers down (the skill's pattern) ---
export function TestPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Finish the TS practice kit", done: false },
    { id: 2, text: "Review the cheatsheet", done: true },
  ]);
  const [nextId, setNextId] = useState(3);

  function addTodo(text: string) {
    setTodos((prev) => [...prev, { id: nextId, text, done: false }]);
    setNextId((n) => n + 1);
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id == id ? { ...t, done: !t.done } : t)),
    );
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <article className="page">
      <h1>Todo List</h1>
      <p className="muted">{remaining} remaining · click a todo to toggle it</p>
      <TodoList todos={todos} onToggle={toggleTodo} onAdd={addTodo} />
    </article>
  );
}

export default TestPage;
