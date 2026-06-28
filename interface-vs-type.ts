// interface vs type — the differences that matter

// ───────────────────────────────────────────────
// 1. Both describe object shapes (identical here)
// ───────────────────────────────────────────────
interface PostI { id: number; title: string; }
type PostT = { id: number; title: string };
// For plain objects, pick either — they behave the same.

// ───────────────────────────────────────────────
// 2. type can do unions — interface CANNOT
// ───────────────────────────────────────────────
type RequestState = "idle" | "loading" | "success" | "error"; // ✅
type Id = number | string; // ✅
// interface can only describe object shapes, never a union/primitive.

// ───────────────────────────────────────────────
// 3. Extending / composing
// ───────────────────────────────────────────────
interface Entity { id: number; }
interface PostExtends extends Entity { title: string; } // interface → extends

type EntityT = { id: number };
type PostIntersection = EntityT & { title: string }; // type → & (intersection)

// ───────────────────────────────────────────────
// 4. Declaration merging — ONLY interface
// ───────────────────────────────────────────────
interface User { id: number; }
interface User { name: string; } // ✅ merges into { id; name }
const u: User = { id: 1, name: "Ada" };

// type UserT = { id: number };
// type UserT = { name: string }; // ❌ Duplicate identifier error

// ───────────────────────────────────────────────
// 5. Computed / mapped / conditional — ONLY type
// ───────────────────────────────────────────────
type PostKeys = keyof PostI;        // "id" | "title"
type PartialPost = Partial<PostI>;  // all fields optional
type ReadonlyPost = Readonly<PostI>;// all fields readonly
type PostTitle = PostI["title"];    // string (indexed access)

// Mapped type — impossible with interface:
type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullablePost = Nullable<PostI>; // every field can be null

// ───────────────────────────────────────────────
// Rule of thumb:
// interface → object shapes / data models (extendable, public API)
// type      → unions, primitives, tuples, computed types
// ───────────────────────────────────────────────

export {};
