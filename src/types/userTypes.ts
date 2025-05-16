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
  [type: string]: string;
};

export type UpdateValue = {
  [type: string]: {
    valid: boolean;
    content: string;
  };
};
