/* ============================================================
   EXERCISE 6 — Typing a React component (props, state, events)
   Difficulty: ⭐⭐
   Type-check only:  npx tsc --noEmit -p practice
   (No runtime run — this is about the TYPES compiling correctly.)
   ============================================================ */
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// TODO 6a: Define the props interface for TodoList:
//   - todos: an array of Todo
//   - onToggle: a callback taking a todo id (number), returning nothing
//   - onAdd: a callback taking the new text (string), returning nothing
// interface TodoListProps { ... }


// TODO 6b: Type this component and its internal state / event handler.
// export function TodoList({ todos, onToggle, onAdd }: TodoListProps) {
//   // draft input text — type the useState
//   const [draft, setDraft] = useState(___);
//
//   // type the change event so e.target.value is a string
//   function handleChange(e: ___) {
//     setDraft(e.target.value);
//   }
//
//   function handleSubmit(e: ___) {
//     e.preventDefault();
//     onAdd(draft);
//     setDraft("");
//   }
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={draft} onChange={handleChange} />
//       <ul>
//         {todos.map((t) => (
//           <li key={t.id} onClick={() => onToggle(t.id)}>
//             {t.done ? "✓ " : ""}{t.text}
//           </li>
//         ))}
//       </ul>
//     </form>
//   );
// }

export {};
