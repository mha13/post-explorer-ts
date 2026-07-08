// Tiny self-check helpers used by the practice files.

// Runtime assertion — throws (with a clear message) if `cond` is false.
export function assert(cond: boolean, message: string): void {
  if (!cond) {
    console.error("❌ FAIL:", message);
    throw new Error(message);
  }
  console.log("✅ PASS:", message);
}

// Compile-time type equality check.
// Usage:  type _t = Expect<Equal<Actual, Expected>>;
// If the two types are NOT identical, this line becomes a TYPE ERROR.
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true
    : false;

export type Expect<T extends true> = T;
