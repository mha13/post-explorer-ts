/* ============================================================
   EXERCISE 1 — Interfaces, optional/nullable, functions
   Difficulty: ⭐ warm-up
   Run runtime checks:  npx tsx practice/01-types.ts
   Type-check:          npx tsc --noEmit -p practice
   ============================================================ */
import { assert } from "./_check";

// TODO 1a: Define a `Book` interface with:
//   - id: number
//   - title: string
//   - author: string
//   - year: number
//   - rating: an OPTIONAL number
//   - series: a string OR null
// interface Book { ... }

interface Book {
   id: number;
   title: string; 
   author: string;
   year: number;
   rating?: number;
   series: string | null;
}


// TODO 1b: Type this function's parameter and return type.
//   It returns the titles of all books published in or after `year`.
// function titlesSince(books: ___, year: ___): ___ {
//   return books.filter((b) => b.year >= year).map((b) => b.title);
// }

function titlesSince(books: Book[], year: number): string[] {
  return books.filter((b) => b.year >= year).map((b) => b.title);
}

// ---- self-check (uncomment once your types compile) ----
const library: Book[] = [
  { id: 1, title: "Dune", author: "Herbert", year: 1965, series: "Dune" },
  { id: 2, title: "Hail Mary", author: "Weir", year: 2021, rating: 5, series: null },
];
assert(
  JSON.stringify(titlesSince(library, 2000)) === JSON.stringify(["Hail Mary"]),
  "titlesSince returns only books from 2000 onward"
);



export {};
