import { useEffect, useState, useTransition } from "react";
import { ExtendedUser } from "../../types/postType";
import { axiosInstance } from "../../api/axiosInstance";

export default function useGetUser(userId: string) {
  const [user, setUser] = useState<ExtendedUser>();
  const [, startTransition] = useTransition();

  const getHandler = async () => {
    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      setUser(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      await getHandler();
    });
  }, []);

  return user;
}
