import { axiosFileInstance } from "../../api/axiosInstance";

export const handleimageChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setFc: React.Dispatch<
    React.SetStateAction<{
      src: string;
      valid: boolean;
    }>
  >
) => {
  const file = e.target.files?.[0];
  if (!file) {
    console.log("파일이 없습니다.");
    return;
  }
  const formData = new FormData();

  formData.append("isCover", false.toString());
  formData.append("image", file);

  try {
    const response = await axiosFileInstance.post(
      "/users/upload-photo",
      formData
    );
    setFc((img) => {
      return {
        ...img,
        src: response.data.image,
        valid: true,
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const handleimageRemove = async (
  setFc: React.Dispatch<
    React.SetStateAction<{
      src: string;
      valid: boolean;
    }>
  >
) => {
  try {
    await axiosFileInstance.post("/users/remove-photo");
    setFc((img) => {
      return {
        ...img,
        src: "",
        valid: false,
      };
    });
  } catch (err) {
    console.error(err);
  }
};
