import CodeBlock from "../components/CodeBlock";

// Phase 1 — TypeScript core syntax, rendered as a readable page.
function Phase1Page() {
  return (
    <article className="page">
      <h1>Phase 1 — TypeScript Core Syntax</h1>

      <h2>1. Basic types</h2>
      <CodeBlock>{`const userId: number = 1;
const title: string = "Learning TypeScript";
const completed: boolean = false;
const tags: string[] = ["typescript", "react"];
const point: [number, number] = [10, 20]; // tuple — fixed length & types`}</CodeBlock>

      <h2>2. interface vs type</h2>
      <CodeBlock>{`interface Post { userId: number; id: number; title: string; body: string; }
type PostT     = { userId: number; id: number; title: string; body: string };`}</CodeBlock>
      <p>
        Convention: <code>interface</code> for object shapes / data models,
        <code> type</code> for unions, primitives, and computed types.
      </p>

      <h2>3. Optional &amp; nullable</h2>
      <CodeBlock>{`interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  thumbnail?: string;     // may be absent entirely
  author: string | null;  // present but can be null
}`}</CodeBlock>

      <h2>4. Function typing</h2>
      <CodeBlock>{`function getPostTitle(post: Post): string {
  return post.title;
}

const filterPosts = (posts: Post[], query: string): Post[] =>
  posts.filter((p) => p.title.includes(query));`}</CodeBlock>

      <h2>5. Union types &amp; narrowing</h2>
      <CodeBlock>{`type RequestState = "idle" | "loading" | "success" | "error";

// discriminated union — idiomatic for API states
type ApiResult =
  | { status: "success"; data: Post[] }
  | { status: "error"; message: string };

function handle(result: ApiResult) {
  if (result.status === "success") {
    console.log(result.data);    // TS knows data exists here
  } else {
    console.log(result.message); // TS knows message exists here
  }
}`}</CodeBlock>

      <h2>6. Generics</h2>
      <CodeBlock>{`function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as Promise<T>;
}`}</CodeBlock>
    </article>
  );
}

export default Phase1Page;
