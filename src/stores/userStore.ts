import { create } from "zustand";
import { UserStore } from "../types/userTypes";
import { BaseUser } from "../types/postType";

export const userStore = create<UserStore>((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || "",
  setUser: (user: BaseUser) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  getToken: () => get().token,
  getUser: () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: "", user: null });
  },
}));
