/* ============================================================
   EXERCISE 7 — useReducer with typed actions (⭐ interview favorite)
   Difficulty: ⭐⭐⭐
   Run runtime checks:  npx tsx practice/07-usereducer.tsx
   (We test the reducer function directly — no React render needed.)
   ============================================================ */
import { assert } from "./_check";

interface CounterState {
  count: number;
}

// TODO 7a: Define an Action discriminated union with:
//   - { type: "increment" }
//   - { type: "decrement" }
//   - { type: "reset" }
//   - { type: "set"; payload: number }
// type Action = ___;

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set"; payload: number };

// TODO 7b: Implement the reducer. Handle every action type.
//   In the default branch, use a `never` exhaustiveness check.
// export function counterReducer(state: CounterState, action: Action): CounterState {
//   ...
// }

export function counterReducer(
  state: CounterState,
  action: Action,
): CounterState {
  switch (action.type) {
    case "increment":
      state.count++;
      return state;
    case "decrement":
      state.count--;
      return state;
    case "reset":
      state.count = 0;
      return state;
    case "set":
      state.count = action.payload;
      return state;
  }
}

// ---- self-check (uncomment when ready) ----
assert(counterReducer({ count: 0 }, { type: "increment" }).count === 1, "increment");
assert(counterReducer({ count: 5 }, { type: "decrement" }).count === 4, "decrement");
assert(counterReducer({ count: 5 }, { type: "reset" }).count === 0, "reset");
assert(counterReducer({ count: 5 }, { type: "set", payload: 42 }).count === 42, "set payload");

export {};
