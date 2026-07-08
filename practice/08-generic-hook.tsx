/* ============================================================
   EXERCISE 8 — A generic custom hook (capstone)
   Difficulty: ⭐⭐⭐⭐
   Type-check:  npx tsc --noEmit -p practice
   ============================================================ */
import { useState } from "react";
import type { Equal, Expect } from "./_check";

// TODO 8: Implement `useToggle` — a boolean state + a toggle function.
//   Return a TUPLE typed as readonly [boolean, () => void].
//   (Hint: `return [on, toggle] as const;`  — why is `as const` needed?)
// export function useToggle(initial: boolean = false): ___ {
//   const [on, setOn] = useState(initial);
//   const toggle = () => setOn((v) => !v);
//   return ___;
// }


// ---- self-check (uncomment when ready) ----
// type ToggleReturn = ReturnType<typeof useToggle>;
// type T8 = Expect<Equal<ToggleReturn, readonly [boolean, () => void]>>;
//
// // Bonus: STRETCH — generalize to `useLocalState<T>(initial: T)` returning
// // readonly [T, (next: T) => void]. Prove it with:
// // type S = Expect<Equal<ReturnType<typeof useLocalState<number>>, readonly [number, (next: number) => void]>>;

export {};
