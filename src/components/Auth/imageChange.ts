import { axiosFileInstance } from "../../api/axiosInstance";
import { userStore } from "../../stores/userStore.ts";
// import { ExtendedUser } from "../../types/postType.ts";

export const handleimageChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) {
    console.log("파일이 없습니다.");
    return;
  }

  const formData = new FormData();

  formData.append("isCover", "false");
  formData.append("image", file);

  try {
    const { data } = await axiosFileInstance.post(
      "/users/upload-photo",
      formData
    );

    userStore.getState().setUser(data);
  } catch (err) {
    console.error(err);
  }
};

export const handleimageRemove = async () => {
  const formData = new FormData();

  formData.append("isCover", "false");

  try {
    const { data } = await axiosFileInstance.delete("/users/delete-photo", {
      data: formData,
    });

    userStore.getState().setUser(data);
  } catch (err) {
    console.error(err);
  }
};
