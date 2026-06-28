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
