# Solutions — check ONLY after you've attempted each exercise

> Try first. Struggling is where the learning sticks. Peek only when stuck for 10+ min.

## 01 — Types
```ts
interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  rating?: number;
  series: string | null;
}

function titlesSince(books: Book[], year: number): string[] {
  return books.filter((b) => b.year >= year).map((b) => b.title);
}
```

## 02 — Utility types
```ts
type ProductCard = Pick<Product, "id" | "name" | "price">;
type NewProduct = Omit<Product, "id">;
type ProductPatch = Partial<Product>;
type ProductsById = Record<number, Product>;
```

## 03 — Generics
```ts
function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}
```

## 04 — unknown / never
```ts
function safeLength(x: unknown): number {
  if (typeof x === "string") return x.length;
  if (Array.isArray(x)) return x.length;
  return 0;
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
    case "rect":   return shape.width * shape.height;
    default: {
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
}
```

## 05 — Data processing
```ts
function latestStatus(events: OrderEvent[]): Record<string, OrderEvent> {
  const result: Record<string, OrderEvent> = {};
  for (const event of events) {
    if (!result[event.orderId] || event.timestamp > result[event.orderId].timestamp) {
      result[event.orderId] = event;
    }
  }
  return result;
}

function countByStatus(events: OrderEvent[]): Record<string, number> {
  const latest = latestStatus(events);
  const counts: Record<string, number> = {};
  for (const orderId in latest) {
    const status = latest[orderId].status;
    counts[status] = (counts[status] ?? 0) + 1;
  }
  return counts;
}
```

## 06 — React component
```ts
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onAdd: (text: string) => void;
}

export function TodoList({ todos, onToggle, onAdd }: TodoListProps) {
  const [draft, setDraft] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDraft(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(draft);
    setDraft("");
  }
  return ( /* ...jsx as given... */ );
}
```

## 07 — useReducer
```ts
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set"; payload: number };

export function counterReducer(state: CounterState, action: Action): CounterState {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    case "reset":     return { count: 0 };
    case "set":       return { count: action.payload };
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}
```

## 08 — Generic hook
```ts
export function useToggle(initial: boolean = false): readonly [boolean, () => void] {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  return [on, toggle] as const;
}
// `as const` makes it a fixed TUPLE [boolean, () => void].
// Without it, TS widens to (boolean | (() => void))[] — an array where each
// slot could be either type, losing the position→type mapping.

// STRETCH:
export function useLocalState<T>(initial: T): readonly [T, (next: T) => void] {
  const [value, setValue] = useState(initial);
  return [value, setValue] as const;
}
```
