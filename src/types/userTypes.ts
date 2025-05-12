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

export type SignUpValue = {
  nickName?: string;
  email?: string;
  password?: string;
  checkPassword?: string;
};

export type SignUpValue1 = {
  name?: {
    valid: boolean;
    content: string;
  };
  email?: {
    valid: boolean;
    content: string;
  };
  password?: {
    valid: boolean;
    content: string;
  };
  checkPassword?: {
    valid: boolean;
    content: string;
  };
};
