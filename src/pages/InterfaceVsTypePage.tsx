import CodeBlock from "../components/CodeBlock";

// interface vs type — the differences that matter, rendered as a page.
function InterfaceVsTypePage() {
  return (
    <article className="page">
      <h1>interface vs type</h1>

      <h2>1. Both describe object shapes (identical)</h2>
      <CodeBlock>{`interface PostI { id: number; title: string; }
type PostT     = { id: number; title: string };`}</CodeBlock>

      <h2>2. Only type can do unions</h2>
      <CodeBlock>{`type RequestState = "idle" | "loading" | "success" | "error"; // ✅
type Id = number | string;                                    // ✅
// interface cannot describe a union/primitive`}</CodeBlock>

      <h2>3. Extending / composing</h2>
      <CodeBlock>{`interface Post extends Entity { title: string; }  // interface → extends
type Post = Entity & { title: string };           // type → & (intersection)`}</CodeBlock>

      <h2>4. Declaration merging — only interface</h2>
      <CodeBlock>{`interface User { id: number; }
interface User { name: string; } // ✅ merges into { id; name }

type UserT = { id: number };
// type UserT = { name: string }; ❌ Duplicate identifier`}</CodeBlock>

      <h2>5. Computed / mapped types — only type</h2>
      <CodeBlock>{`type PostKeys    = keyof PostI;       // "id" | "title"
type PartialPost = Partial<PostI>;    // all optional
type ReadonlyPost = Readonly<PostI>;  // all readonly
type Nullable<T> = { [K in keyof T]: T[K] | null }; // mapped type`}</CodeBlock>

      <div className="callout">
        <strong>Rule of thumb:</strong> <code>interface</code> for object shapes /
        data models (extendable, public API); <code>type</code> for unions,
        primitives, tuples, and computed types.
      </div>
    </article>
  );
}

export default InterfaceVsTypePage;
