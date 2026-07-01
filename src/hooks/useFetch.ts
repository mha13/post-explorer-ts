import { useEffect, useState } from "react";
import type { ApiState } from "../types";

// A generic data-fetching hook.
//   useFetch<Person>(getPerson)      → ApiState<Person>
//   useFetch<Post[]>(getPosts)       → ApiState<Post[]>
//
// `fetcher` is any function returning Promise<T>. `deps` re-runs the fetch
// when they change (same idea as useEffect's dependency array).
export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const error = err instanceof Error ? err.message : "Unknown error";
          setState({ data: null, loading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
