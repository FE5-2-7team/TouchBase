import { BaseUser, ExtendedUser } from "./postType";

export interface UserStore {
  user: ExtendedUser | null;
  token: string;
  setUser: (user: BaseUser | ExtendedUser) => void;
  setToken: (token: string) => void;
  getToken: () => string;
  getUser: () => null | ExtendedUser;
  logout: () => void;
}

export type SignUpValue = {
  // nickName?: string;
  // email?: string;
  // password?: string;
  // name?: string;
  // checkPassword?: string;
  [type: string]: string;
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
