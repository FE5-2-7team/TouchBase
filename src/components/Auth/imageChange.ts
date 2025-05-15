import Swal from "sweetalert2";
import { axiosFileInstance } from "../../api/axiosInstance";
import { userStore } from "../../stores/userStore.ts";
// import { ExtendedUser } from "../../types/postType.ts";

export const handleimageChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];
  console.log(userStore.getState().getToken());

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

    Swal.fire({
      icon: "success",
      title: "이미지가 변경 됐습니다",
      confirmButtonText: "닫기",
    });
    userStore.getState().setUser(data);
  } catch (err) {
    console.error(err);
  }
};

export const handleimageRemove = async () => {
  console.log(userStore.getState().getToken());
  const formData = new FormData();

  formData.append("isCover", "false");

  try {
    const { data } = await axiosFileInstance.delete("/users/delete-photo", {
      data: formData,
    });

    Swal.fire({
      icon: "success",
      title: "이미지 삭제 됐습니다",
      confirmButtonText: "닫기",
    });
    userStore.getState().setUser(data);
  } catch (err) {
    console.error(err);
  }
};
