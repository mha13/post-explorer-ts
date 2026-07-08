/* ============================================================
   EXERCISE 2 — Utility types (Pick / Omit / Record / Partial)
   Difficulty: ⭐⭐
   Type-check (this one is TYPE-ONLY): npx tsc --noEmit -p practice
   ============================================================ */
import type { Equal, Expect } from "./_check";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

// TODO 2a: `ProductCard` — only `id`, `name`, `price`. Use Pick.
// type ProductCard = ___;
type ProductCard = Pick<Product, "id" | "name" | "price">;

// TODO 2b: `NewProduct` — a Product WITHOUT `id` (not created yet). Use Omit.
// type NewProduct = ___;
type NewProduct = Omit<Product, "id">;

// TODO 2c: `ProductPatch` — every field optional (for a PATCH update). Use Partial.
// type ProductPatch = ___;
type ProductPatch = Partial<Product>;

// TODO 2d: `ProductsById` — a dictionary from number id -> Product. Use Record.
// type ProductsById = ___;
type ProductsById = Record<number, Product>;

// ---- self-check: these type-level tests must all be `true` ----
// Uncomment each as you finish. A red squiggle = wrong answer.
type T2a = Expect<
  Equal<ProductCard, { id: number; name: string; price: number }>
>;
type T2b = Expect<
  Equal<keyof NewProduct, "name" | "price" | "description" | "inStock">
>;
type T2c = Expect<Equal<ProductPatch["price"], number | undefined>>;
type T2d = Expect<Equal<ProductsById, Record<number, Product>>>;

export {};
