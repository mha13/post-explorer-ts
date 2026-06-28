import type { Post } from "../types";

interface PostListProps {
  posts: Post[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function PostList({ posts, selectedId, onSelect }: PostListProps) {
  if (posts.length === 0) {
    return <p className="muted">No posts match your search.</p>;
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li
          key={post.id}
          className={
            post.id === selectedId ? "post-item post-item--active" : "post-item"
          }
          onClick={() => onSelect(post.id)}
        >
          <span className="post-item__id">#{post.id}</span>
          {post.title}
        </li>
      ))}
    </ul>
  );
}

export default PostList;
