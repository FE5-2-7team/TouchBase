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
