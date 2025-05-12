import { FaCamera } from "react-icons/fa";
import ProfileIcon from "../Icons/ProfileIcon";
import { twMerge } from "tailwind-merge";
import { userStore } from "../../stores/userStore";
import { BaseUser } from "../../types/postType.ts";
import { useState } from "react";
import handleimageChange from "./imageChange.ts";

export default function ProfileImage({ className }: { className: string }) {
  const user: BaseUser | null = userStore.getState().getUser();
  console.log(user);

  const [image, setimage] = useState({
    src: "",
    valid: false,
  });

  return (
    <>
      <div
        className={twMerge(
          "relative w-[116px] h-[116px] min-w-[116px] min-h-[116px]",
          className
        )}
      >
        <div className="bg-[#2F6BEB] overflow-hidden w-full h-full rounded-full flex items-center justify-center">
          {image.valid ? (
            <img src={image.src} className="w-full h-full object-cover"></img>
          ) : (
            <ProfileIcon size={82} />
          )}
        </div>
        <div className="absolute cursor-pointer box-content w-[30px] h-[30px] top-[-4px] right-[-4px] bg-[#ABABAB] rounded-full p-1 flex items-center justify-center border-white border-[4px]">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleimageChange(e, setimage)}
          ></input>
          <FaCamera className="text-[#fff] text-[21px]" />
        </div>
      </div>
    </>
  );
}
