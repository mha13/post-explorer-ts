import { useEffect, useState } from "react";
import type { Post, User, Comment, ApiState } from "../types";
import { getPosts, getUser, getComments } from "../api";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import PostDetail from "../components/PostDetail";

function PostExplorerPage() {
  // --- posts list state (the generic ApiState<T> in action) ---
  const [postsState, setPostsState] = useState<ApiState<Post[]>>({
    data: null,
    loading: true,
    error: null,
  });

  // --- search + selection ---
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // --- detail state (author + comments for the selected post) ---
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Fetch all posts once on mount.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const posts = await getPosts();
        if (!cancelled) {
          setPostsState({ data: posts, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Unknown error";
          setPostsState({ data: null, loading: false, error: message });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // When a post is selected, fetch its author + comments together.
  useEffect(() => {
    if (selectedId === null) return;
    const post = postsState.data?.find((p) => p.id === selectedId);
    if (!post) return;

    let cancelled = false;
    setDetailLoading(true);
    setDetailError(null);
    setAuthor(null);

    async function loadDetail() {
      try {
        // Promise.all → both requests run in parallel, not one-after-the-other.
        const [user, postComments] = await Promise.all([
          getUser(post!.userId),
          getComments(post!.id),
        ]);
        if (!cancelled) {
          setAuthor(user);
          setComments(postComments);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Unknown error";
          setDetailError(message);
        }
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    }

    loadDetail();
    return () => {
      cancelled = true;
    };
  }, [selectedId, postsState.data]);

  // Derived: posts filtered by the search query (case-insensitive).
  const visiblePosts =
    postsState.data?.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  const selectedPost =
    postsState.data?.find((p) => p.id === selectedId) ?? null;

  return (
    <article className="page">
      <h1>Post Explorer</h1>

      {postsState.loading && <p className="muted">Loading posts…</p>}
      {postsState.error && <p className="error">{postsState.error}</p>}

      {postsState.data && (
        <div className="explorer">
          <div className="explorer__list">
            <SearchBar query={query} onQueryChange={setQuery} />
            <PostList
              posts={visiblePosts}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="explorer__detail">
            {selectedPost ? (
              <PostDetail
                post={selectedPost}
                author={author}
                comments={comments}
                loading={detailLoading}
                error={detailError}
              />
            ) : (
              <p className="muted">Select a post to see details.</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default PostExplorerPage;
