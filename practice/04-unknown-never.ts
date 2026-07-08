/* ============================================================
   EXERCISE 4 — unknown narrowing & never exhaustiveness
   Difficulty: ⭐⭐⭐
   Run:  npx tsx practice/04-unknown-never.ts
   ============================================================ */
import { assert } from "./_check";

// TODO 4a: `safeLength` takes an `unknown` value.
//   - if it's a string, return its length
//   - if it's an array, return its length
//   - otherwise return 0
//   You MUST narrow `x` before using .length (no `any`, no `as`).
// function safeLength(x: unknown): number {
//   ...
// }

function safeLength(x: unknown): number {
  if (typeof x === "string" || Array.isArray(x)) {
    return x.length;
  } else {
    return 0;
  }
}

// A discriminated union of shapes:
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rect"; width: number; height: number };

// TODO 4b: `area` returns the area for each shape.
//   In the default branch, assign `shape` to a `never` variable so that
//   adding a new shape later forces a compile error here.
// function area(shape: Shape): number {
//   switch (shape.kind) {
//     ...
//     default: {
//       const _exhaustive: never = shape;
//       return _exhaustive;
//     }
//   }
// }

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return 3.14159 * Math.pow(shape.radius, 2);
      break;
    case "square":
      return shape.side * shape.side;
      break;
    case "rect":
      return shape.width * shape.height;
      break;
    default: {
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
}

// ---- self-check (uncomment when ready) ----
assert(safeLength("hello") === 5, "safeLength of string");
assert(safeLength([1, 2, 3]) === 3, "safeLength of array");
assert(safeLength(42) === 0, "safeLength of number is 0");
assert(
  area({ kind: "circle", radius: 1 }) > 3.14 &&
    area({ kind: "circle", radius: 1 }) < 3.15,
  "circle area",
);
assert(area({ kind: "square", side: 3 }) === 9, "square area");
assert(area({ kind: "rect", width: 2, height: 5 }) === 10, "rect area");

export {};
