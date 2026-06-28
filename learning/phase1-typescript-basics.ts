// Phase 1 — TypeScript core syntax
// Examples tied to JSONPlaceholder data shapes (Post, Comment)

// 1. Basic types
const userId: number = 1;
const title: string = "Learning TypeScript";
const completed: boolean = false;
const tags: string[] = ["typescript", "react"];
const point: [number, number] = [10, 20]; // tuple — fixed length & types
const point2: [number, string] = [10, "20"]; // tuple — fixed length & types

// 2. interface vs type
interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// 3. Optional & nullable properties
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  thumbnail?: string; // may be absent entirely
  author: string | null; // present but can be null
}

// 4. Function typing
function getPostTitle(post: Post): string {
  return post.title;
}

const filterPosts = (posts: Post[], query: string): Post[] =>
  posts.filter((p) => p.title.includes(query));

// 5. Union types & narrowing
type RequestState = "idle" | "loading" | "success" | "error";

function describe(state: RequestState): string | undefined {
  if (state === "error") return "Something went wrong"; // narrowed to "error"
}

// discriminated union — idiomatic way to model API states
type ApiResult =
  | { status: "success"; data: Post[] }
  | { status: "error"; message: string };

function handle(result: ApiResult): void {
  if (result.status === "success") {
    console.log(result.data); // TS knows `data` exists here
  } else {
    console.log(result.message); // TS knows `message` exists here
  }
}

// 6. Generics — enough for useState<T> and typed fetch wrappers
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as Promise<T>;
}

// --- Exercise: define these by hand, without looking up ---
// 1. Rewrite the Post interface above from memory.
// 2. Define a Comment interface: postId, id, name, email, body.
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  thumbnail?: string; // may be absent entirely
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}