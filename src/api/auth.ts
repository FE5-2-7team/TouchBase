import { axiosInstance } from "./axiosInstance";
import { useUserStore } from "../stores/userStore";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    if (response.status === 200) {
      useUserStore.getState().setToken(response.data.token);
      useUserStore.getState().setUser(response.data.user);
      return response.data;
    } else {
      throw new Error("로그인 실패");
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    if (response.status === 200) {
      useUserStore.getState().logout();
      return response.data;
    } else {
      throw new Error("로그아웃 실패");
    }
  } catch (error) {
    console.log(error);
  }
};
export const checkLogin = async () => {
  try {
    const response = await axiosInstance.get("/auth-user");
    if (response.status === 200) {
      useUserStore.getState().setUser(response.data);
      return response.data;
    } else {
      await logout();
      throw new Error("로그인 상태가 아닙니다.");
    }
  } catch (error) {
    console.log(error);
  }
};
