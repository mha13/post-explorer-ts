import CodeBlock from "../components/CodeBlock";

// The highest-yield React + TypeScript interview topics, in one place.
function CheatsheetPage() {
  return (
    <article className="page">
      <h1>Interview Cheatsheet</h1>
      <p className="muted">
        The must-know React + TypeScript topics. Skim before the interview.
      </p>

      <h2>1. Utility types</h2>
      <CodeBlock>{`Partial<Post>              // all fields optional
Required<Post>             // all fields required
Readonly<Post>             // all fields readonly
Pick<Post, "id" | "title"> // keep only these keys
Omit<Post, "body">         // all keys EXCEPT these
Record<string, Post>       // { [key: string]: Post }`}</CodeBlock>
      <p>Reach for <code>Pick</code>/<code>Omit</code> to derive types instead of rewriting them.</p>

      <h2>2. useReducer with typed actions (discriminated union)</h2>
      <CodeBlock>{`interface State { count: number; }

type Action =
  | { type: "increment" }
  | { type: "reset" }
  | { type: "setCount"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "reset":     return { count: 0 };
    case "setCount":  return { count: action.payload }; // payload is typed
    default:
      const _exhaustive: never = action; // ← compile error if a case is missing
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: "setCount", payload: 5 });`}</CodeBlock>

      <h2>3. unknown vs any vs never</h2>
      <CodeBlock>{`any     // turns OFF type checking — avoid
unknown // "don't know yet" — must narrow before use (safe any)
never   // impossible value — used for exhaustiveness checks

function handle(x: unknown) {
  // x.toUpperCase();          ❌ must narrow first
  if (typeof x === "string") x.toUpperCase(); // ✅ narrowed
}`}</CodeBlock>

      <h2>4. Typing useState / useRef</h2>
      <CodeBlock>{`const [posts, setPosts] = useState<Post[]>([]);       // array
const [user, setUser]   = useState<User | null>(null); // object or null
const [q, setQ]         = useState("");                // inferred

const inputRef = useRef<HTMLInputElement>(null); // DOM ref
inputRef.current?.focus();
const idRef = useRef<number>(0);                 // mutable value (no re-render)`}</CodeBlock>

      <h2>5. Typing events</h2>
      <CodeBlock>{`e: React.ChangeEvent<HTMLInputElement>  // input onChange
e: React.MouseEvent<HTMLButtonElement>  // button onClick
e: React.FormEvent<HTMLFormElement>     // form onSubmit → e.preventDefault()`}</CodeBlock>

      <h2>6. Props, children &amp; composition</h2>
      <CodeBlock>{`interface CardProps {
  title: string;
  onClose: () => void;          // callback prop → returns void
  children: React.ReactNode;    // anything renderable
}
// shortcut for children:
type Props = React.PropsWithChildren<{ title: string }>;`}</CodeBlock>

      <h2>7. Generics &amp; constraints</h2>
      <CodeBlock>{`function getFirst<T>(items: T[]): T | undefined { return items[0]; }

// constrain T so it MUST have an id:
function getId<T extends { id: number }>(item: T): number {
  return item.id;
}

// generic custom hook (what you built):
function useFetch<T>(fetcher: () => Promise<T>): ApiState<T> { /* ... */ }`}</CodeBlock>

      <h2>8. as const &amp; literal types</h2>
      <CodeBlock>{`const ROLES = ["admin", "user", "guest"] as const;
type Role = typeof ROLES[number]; // "admin" | "user" | "guest"

// custom hook returning a typed tuple:
function useToggle() {
  const [on, setOn] = useState(false);
  return [on, () => setOn((v) => !v)] as const; // as const → tuple, not (bool|fn)[]
}`}</CodeBlock>

      <h2>9. interface vs type (one-liner)</h2>
      <CodeBlock>{`interface → object shapes / models (extendable, can merge)
type      → unions, primitives, tuples, computed/mapped types`}</CodeBlock>

      <div className="callout">
        <strong>Non-typing React to be able to explain out loud:</strong> Rules of
        Hooks (no hooks in conditionals) · useMemo/useCallback (memoize expensive
        work / stable refs — don't overuse) · controlled vs uncontrolled inputs ·
        why index-as-<code>key</code> is a bug · lifting state up vs Context ·
        useEffect deps + cleanup for race conditions.
      </div>
    </article>
  );
}

export default CheatsheetPage;
