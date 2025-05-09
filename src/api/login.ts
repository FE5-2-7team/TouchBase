import { axiosInstance } from "./axiosInstance";
import { userStore } from "../stores/userStore";

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
      userStore.getState().setToken(response.data.token);
      userStore.getState().setUser(response.data.user);
      return response.data;
    } else {
      throw new Error("로그인 실패");
    }
  } catch (error) {
    console.log(error);
  }
};
