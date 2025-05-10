import { FaCamera } from "react-icons/fa";
import ProfileIcon from "../Icons/ProfileIcon";
import { twMerge } from "tailwind-merge";

export default function ProfileImage({ className }: { className: string }) {
  return (
    <>
      <div
        className={twMerge(
          "relative w-[116px] h-[116px] min-w-[116px] min-h-[116px]",
          className
        )}
      >
        <div className="bg-[#2F6BEB] w-full h-full rounded-full flex items-center justify-center">
          <ProfileIcon size={82} />
        </div>
        <div className="absolute cursor-pointer box-content w-[30px] h-[30px] top-[-4px] right-[-4px] bg-[#ABABAB] rounded-full p-1 flex items-center justify-center border-white border-[4px]">
          <FaCamera className="text-[#fff] text-[21px]" />
        </div>
      </div>
    </>
  );
}
