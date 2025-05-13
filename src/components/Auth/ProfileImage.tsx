import { FaCamera, FaRegTrashAlt } from "react-icons/fa";
import ProfileIcon from "../Icons/ProfileIcon";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";
import { handleimageChange, handleimageRemove } from "./imageChange.ts";
// import { ExtendedUser } from "../../types/postType.ts";

type PropsType = {
  className: string;
  src: string | undefined;
};

export default function ProfileImage({ className, src }: PropsType) {
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
          {src ? (
            <img src={src} className="w-full h-full object-cover"></img>
          ) : (
            <ProfileIcon size={82} />
          )}
        </div>
        <div className="absolute cursor-pointer box-content w-[30px] h-[30px] top-[-4px] right-[-4px] bg-[#ABABAB] rounded-full p-1 flex items-center justify-center border-white border-[4px] overflow-hidden">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleimageChange(e)}
            ref={inputRef}
            className="sr-only"
          ></input>
          {src ? (
            <FaRegTrashAlt
              onClick={handleimageRemove}
              className="text-[#fff] text-[20px]"
            />
          ) : (
            <FaCamera
              onClick={() => inputRef.current!.click()}
              className="text-[#fff] text-[20px]"
            />
          )}
        </div>
      </div>
    </>
  );
}
