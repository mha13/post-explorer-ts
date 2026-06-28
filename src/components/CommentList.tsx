import type { Comment } from "../types";

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  return (
    <div className="comments">
      <h3>Comments ({comments.length})</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            <div className="comment__email">{comment.email}</div>
            <p className="comment__body">{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
