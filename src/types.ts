// All app data shapes live here — defined BEFORE any component uses them.

// GET /posts  and  /posts/:id
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// GET /posts/:id/comments
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// GET /users/:id  (JSONPlaceholder returns more, but this is all we use)
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// Generic async state: works for ANY data type T.
//   ApiState<Post[]>  → a list of posts
//   ApiState<User>    → a single user
// loading + error + data in one object (the simple, common pattern).
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// --- Our CLEAN shape, used everywhere in the app ---
export interface Person {
  name: string;
  gender: string;
  email: string;
  picture: string;
  phone: string | null;
}

// --- The RAW shape randomuser.me actually returns ---
// (type what the API really sends, then map it to Person)
export interface RawPerson {
  gender: string;
  email: string;
  phone: string;
  name: { title: string; first: string; last: string };
  picture: { large: string; medium: string; thumbnail: string };
}

export interface RandomUserResponse {
  results: RawPerson[]; // the data is wrapped in an array under `results`
  info: { seed: string; results: number; page: number; version: string };
}
