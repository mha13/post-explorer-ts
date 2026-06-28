import type { Post, User, Comment } from "../types";
import CommentList from "./CommentList";

interface PostDetailProps {
  post: Post;
  author: User | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

function PostDetail({ post, author, comments, loading, error }: PostDetailProps) {
  return (
    <div className="detail">
      <h2>{post.title}</h2>
      <p className="detail__body">{post.body}</p>

      {/* author can be null while it's still loading */}
      {author && (
        <p className="detail__author">
          By <strong>{author.name}</strong> ({author.email})
        </p>
      )}

      {loading && <p className="muted">Loading author &amp; comments…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && <CommentList comments={comments} />}
    </div>
  );
}

export default PostDetail;
