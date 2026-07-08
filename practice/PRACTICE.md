# TypeScript Practice Kit 🏋️

Eight self-checking exercises across everything you learned. You write the code;
the checks tell you if you're right. **Do them in order** — difficulty ramps up.

## How to work through it

1. Open an exercise file (e.g. `practice/01-types.ts`).
2. Fill in each `TODO`. Delete the `// ` in front of the code as you go.
3. **Uncomment the self-check block** at the bottom.
4. Check your work with the commands below.
5. Only after a real attempt, compare against `practice/solutions/SOLUTIONS.md`.

## Two ways to check (use both)

**Type-check** — did your TYPES compile? (works for every exercise)
```bash
npx tsc --noEmit -p practice
```
No output = ✅ everything's correct. Red errors point to the exact line.

**Runtime-check** — does the LOGIC work? (for the runnable ones)
```bash
npx tsx practice/01-types.ts        # prints ✅ PASS / ❌ FAIL per assertion
```

## The exercises

| # | File | Topic | Check with |
|---|------|-------|-----------|
| 1 | `01-types.ts` | interfaces, optional/nullable, function typing | `tsx` + `tsc` |
| 2 | `02-utility-types.ts` | Pick / Omit / Partial / Record | `tsc` (type-only) |
| 3 | `03-generics.ts` | generics + `keyof` constraints | `tsx` + `tsc` |
| 4 | `04-unknown-never.ts` | `unknown` narrowing, `never` exhaustiveness | `tsx` + `tsc` |
| 5 | `05-data-processing.ts` | group-by / latest-wins (interview classic) | `tsx` + `tsc` |
| 6 | `06-react-component.tsx` | props, `useState`, event types | `tsc` (type-only) |
| 7 | `07-usereducer.tsx` | typed reducer + discriminated union | `tsx` + `tsc` |
| 8 | `08-generic-hook.tsx` | generic custom hook, tuple return, `as const` | `tsc` (type-only) |

## Rules for maximum confidence

- **No `any`. No `as`** (except `as const`). If you reach for them, you're dodging the lesson.
- Try to say *why* each type is what it is out loud — that's the interview.
- Stuck for 10+ min? Peek at the solution for THAT exercise only, understand it,
  then close it and re-type from memory.

## When you're done

Run the full type-check — a clean pass across all 8 means you've got it:
```bash
npx tsc --noEmit -p practice
```

Good luck. You built a real typed app and a generic hook already — this just
proves to yourself that you can do it cold. 💪
