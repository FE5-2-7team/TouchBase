import { FaCamera, FaRegTrashAlt } from "react-icons/fa";
import ProfileIcon from "../Icons/ProfileIcon";
import { twMerge } from "tailwind-merge";
import { userStore } from "../../stores/userStore";
import { BaseUser } from "../../types/postType.ts";
import { useRef, useState } from "react";
import { handleimageChange, handleimageRemove } from "./imageChange.ts";

export default function ProfileImage({ className }: { className: string }) {
  const user: BaseUser | null = userStore.getState().getUser();
  console.log(user);

  const [image, setimage] = useState({
    src: "",
    valid: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

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
        <div className="absolute cursor-pointer box-content w-[30px] h-[30px] top-[-4px] right-[-4px] bg-[#ABABAB] rounded-full p-1 flex items-center justify-center border-white border-[4px] overflow-hidden">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleimageChange(e, setimage)}
            ref={inputRef}
            className="absolute top-[-100px]"
          ></input>
          {image.valid ? (
            <FaRegTrashAlt
              onClick={() => handleimageRemove(setimage)}
              className="text-[#fff] text-[22px]"
            />
          ) : (
            <FaCamera
              onClick={() => inputRef.current!.click()}
              className="text-[#fff] text-[21px]"
            />
          )}
        </div>
      </div>
    </>
  );
}
