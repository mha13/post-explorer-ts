// Phase 2 — Typing React
// (illustrative file — assumes React is installed; the real project comes in Phase 3)

import { useState, useEffect } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// ───────────────────────────────────────────────
// 1. Typing function components & props
// ───────────────────────────────────────────────
interface PostListProps {
  posts: Post[];
  onSelect: (id: number) => void; // a function prop: takes a number, returns nothing
}

function PostList({ posts, onSelect }: PostListProps) {
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id} onClick={() => onSelect(p.id)}>
          {p.title}
        </li>
      ))}
    </ul>
  );
}

// ───────────────────────────────────────────────
// 2. Typing useState — primitives, objects, arrays
// ───────────────────────────────────────────────
function StateExamples() {
  const [posts, setPosts] = useState<Post[]>([]); // array of Post
  const [selected, setSelected] = useState<Post | null>(null); // object OR null
  const [query, setQuery] = useState(""); // primitive — type INFERRED, no <T> needed

  // 3. Typing event handlers
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  function handleClick(_e: React.MouseEvent<HTMLButtonElement>) {
    setSelected(posts[0] ?? null);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={handleChange} />
      <button onClick={handleClick}>Select first</button>
    </form>
  );
}

// ───────────────────────────────────────────────
// 4. Typing fetch response data
// ───────────────────────────────────────────────
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // fetch's .json() is typed Promise<any> — YOU assert the real shape:
  return res.json() as Promise<Post[]>;
}

// ───────────────────────────────────────────────
// 5. Typing useEffect async (the common pitfall)
// ───────────────────────────────────────────────
function PostsLoader() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // ❌ the effect callback itself must NOT be async
    //    (async returns a Promise; useEffect wants void or a cleanup fn)
    // ✅ declare an async function INSIDE and call it:
    let cancelled = false;

    async function load() {
      const data = await getPosts();
      if (!cancelled) setPosts(data); // guard: don't set state after unmount
    }
    load();

    return () => {
      cancelled = true; // cleanup
    };
  }, []);

  return <PostList posts={posts} onSelect={(id) => console.log(id)} />;
}

export { PostList, StateExamples, PostsLoader };
