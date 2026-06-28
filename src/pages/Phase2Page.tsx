import CodeBlock from "../components/CodeBlock";

// Phase 2 — Typing React, rendered as a readable page.
function Phase2Page() {
  return (
    <article className="page">
      <h1>Phase 2 — Typing React</h1>

      <h2>1. Components &amp; props</h2>
      <CodeBlock>{`interface PostListProps {
  posts: Post[];
  onSelect: (id: number) => void; // function prop
}

function PostList({ posts, onSelect }: PostListProps) {
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id} onClick={() => onSelect(p.id)}>{p.title}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>

      <h2>2. Typing useState</h2>
      <CodeBlock>{`const [posts, setPosts] = useState<Post[]>([]);          // array
const [selected, setSelected] = useState<Post | null>(null); // object or null
const [query, setQuery] = useState("");                   // primitive — inferred`}</CodeBlock>

      <h2>3. Typing event handlers</h2>
      <CodeBlock>{`function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setQuery(e.target.value);
}
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {}
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}`}</CodeBlock>

      <h2>4. Typing fetch data</h2>
      <CodeBlock>{`async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json() as Promise<Post[]>; // .json() is Promise<any> — assert the shape
}`}</CodeBlock>

      <h2>5. useEffect async (the pitfall)</h2>
      <CodeBlock>{`useEffect(() => {
  // ❌ the effect callback itself must NOT be async
  let cancelled = false;
  async function load() {
    const data = await getPosts();
    if (!cancelled) setPosts(data); // guard against post-unmount updates
  }
  load();
  return () => { cancelled = true; }; // cleanup
}, []);`}</CodeBlock>
    </article>
  );
}

export default Phase2Page;
