import type { Post, Comment, User, Person, RandomUserResponse } from "./types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// One generic helper: fetch a URL and assert the JSON shape as T.
// Throws on a non-2xx response so callers can show an error state.
async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// Each function names its exact return type — that's what types the whole app.
export function getPosts(): Promise<Post[]> {
  return getJSON<Post[]>("/posts");
}

export function getComments(postId: number): Promise<Comment[]> {
  return getJSON<Comment[]>(`/posts/${postId}/comments`);
}

export function getUser(userId: number): Promise<User> {
  return getJSON<User>(`/users/${userId}`);
}

const RANDOM_USER_URL = "https://randomuser.me/api/";

export async function getPerson(): Promise<Person> {
  const res = await fetch(RANDOM_USER_URL);
  if (!res.ok) {
    throw new Error("Failed to receive the Person");
  }
  // Type the REAL response shape, then take the first result…
  const json = (await res.json()) as RandomUserResponse;
  const raw = json.results[0];

  // …and map the nested raw shape into our clean flat Person.
  return {
    name: `${raw.name.first} ${raw.name.last}`,
    gender: raw.gender,
    email: raw.email,
    picture: raw.picture.large,
    phone: raw.phone,
  };
}
