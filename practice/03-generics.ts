/* ============================================================
   EXERCISE 3 — Generics & constraints
   Difficulty: ⭐⭐
   Run:  npx tsx practice/03-generics.ts
   ============================================================ */
import { assert } from "./_check";

// TODO 3a: `last<T>` — return the LAST element of an array, or undefined if empty.
// function last<T>(items: T[]): ___ {
//   return items[items.length - 1];
// }
function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

// TODO 3b: `pluck` — given an array of objects and a key, return that key's values.
//   Constrain K so it must be a real key of T.  (Hint: <T, K extends keyof T>)
//   Return type should be T[K][].
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

// ---- self-check (uncomment when ready) ----
assert(last<number>([1, 2, 3]) === 3, "last returns final element");
assert(last<string>(["a", "b", "c"]) === "c", "last returns final element");
assert(last<string>([]) === undefined, "last of empty array is undefined");


interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Linus" },
];
assert(
  JSON.stringify(pluck<User, "name">(users, "name")) === JSON.stringify(["Ada", "Linus"]),
  "pluck extracts the chosen key",
);
console.log("pluck result:", pluck(users, "name"));
// This line SHOULD be a type error (uncomment to prove the constraint works):
// pluck(users, "email"); // ❌ "email" is not a key of the user objects

export {};
