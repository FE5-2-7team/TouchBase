import { useState } from "react";
import { axiosFileInstance } from "../../api/axiosInstance";
import BlueBoard from "./BlueBoard";
import Button from "../FanPage/Button";
import { userStore } from "../../stores/userStore";
import Message from "./Message.tsx";

export default function SelectClub() {
  const [selectedValue, setSelectedValue] = useState("");

  const imageOptions = [
    { label: "구단 선택", value: "구단 선택", imageUrl: "" },
    {
      label: "KIA 타이거즈",
      value: "KIA 타이거즈",
      imageUrl: "/public/images/kia.png",
    },
    {
      label: "삼성 라이온즈",
      value: "삼성 라이온즈",
      imageUrl: "/public/images/samsung.png",
    },
    {
      label: "LG 트윈스",
      value: "LG 트윈스",
      imageUrl: "/public/images/lg.webp",
    },
    {
      label: "두산 베어스",
      value: "두산 베어스",
      imageUrl: "/public/images/doosan.webp",
    },
    { label: "KT wiz", value: "KT wiz", imageUrl: "/public/images/kt.png" },
    {
      label: "SSG 랜더스",
      value: "SSG 랜더스",
      imageUrl: "/public/images/ssg.png",
    },
    {
      label: "롯데 자이언츠",
      value: "롯데 자이언츠",
      imageUrl: "/public/images/lotte.png",
    },
    {
      label: "한화 이글스",
      value: "한화 이글스",
      imageUrl: "/public/images/hanwha.webp",
    },
    {
      label: "NC 다이노스",
      value: "NC 다이노스",
      imageUrl: "/public/images/nc.png",
    },
    {
      label: "키움 히어로즈",
      value: "키움 히어로즈",
      imageUrl: "/public/images/kium.png",
    },
  ];

  type SelectdOption = {
    label: string;
    value: string;
    imageUrl: string;
  };

  const handleSubmit = async () => {
    if (!selectedValue) return;

    const selected = imageOptions.find(
      (option) => option.value === selectedValue
    ) as SelectdOption;

    if (selected.imageUrl === "") return;

    try {
      const selectedImage = await fetch(selected.imageUrl);
      const blob = await selectedImage.blob();

      const fileName = selected.imageUrl.split("/").pop() as string;
      const file = new File([blob], fileName, { type: blob.type });
      const formData = new FormData();
      formData.append("isCover", "true");
      formData.append("image", file);
      const { data } = await axiosFileInstance.post(
        "/users/upload-photo",
        formData
      );
      console.log(data);
      userStore.getState().setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BlueBoard className="py-[25px] px-[23px] w-full max-w-[650px] bg-white mt-[20px] relative mb-[30px]">
        <h2 className="dark:text-white text-[16px] text-[#464646] mb-[7px]">
          구단 변경
        </h2>
        <p className="dark:text-[#BABABA] text-[14px] text-[#6D6D6D] mb-[48px] font-medium">
          응원하는 구단을 선택해 주세요
        </p>
        <div className="flex gap-[44px] justify-between">
          <select
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedValue(e.target.value);
            }}
            className="text-gray-400 px-[4px] border-b border-[#0033A0] font-semibold dark:text-white dark:placeholder:text-black h-[40px] mb-[0] w-[475px] dark:border-[#fff]"
          >
            {imageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button
            onClick={handleSubmit}
            className="w-[80px] h-[40px] text-[14px] rounded-[5px]"
          >
            변경하기
          </Button>
        </div>
        {selectedValue === "구단 선택" && (
          <Message className="bottom-[3px] top-auto left-[22px]">
            구단을 선택해 주세요
          </Message>
        )}
      </BlueBoard>
    </>
  );
}
