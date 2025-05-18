import { axiosInstance } from "./axiosInstance";

const getNotifications = async () => {
  try {
    const response = await axiosInstance.get("/notifications");
    return response.data;
  } catch (error) {
    console.error("알림 목록 불러오기 실패", error);
  }
};

export { getNotifications };
