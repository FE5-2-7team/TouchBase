import { BaseUser } from "./postType";

export interface UserStore {
  user: BaseUser | null;
  token: string;
  setUser: (user: BaseUser) => void;
  setToken: (token: string) => void;
  getToken: () => string;
  getUser: () => BaseUser | null;
  logout: () => void;
}
