import { FaUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export default function FollowCard({
  name,
  isOnline,
  isFollowing,
}: {
  name: string;
  isOnline: boolean;
  isFollowing: boolean;
}) {
  return (
    <>
      <div className="flex items-center border border-[#335CB3] dark:border-[#FFFFFF] rounded-[10px] w-[470px] h-[63px] justify-between px-[13px] my-[5px]">
        <div className="relative w-[34px] h-[34px]">
          <FaUserCircle className="absolute w-full h-full fill-[#0033A0] dark:fill-[#FFFFFF]" />
          <div
            className={twMerge(
              "absolute w-[8px] h-[8px] right-[1px] rounded-[100px] bg-[#00FF1E] dark:border dark:border-[#0033A0]",
              !isOnline && "hidden"
            )}
          />
        </div>
        <div className="text-[16px] text-[#6D6D6D] dark:text-[#FFFFFF] w-[170px]">{name}</div>
        <button className="w-[100px] h-[24px] text-[14px] rounded-[10px] bg-[#0033A0] text-[#ffffff] cursor-pointer">
          쪽지 보내기
        </button>
        {isFollowing ? (
          <button className="w-[100px] h-[24px] text-[14px] rounded-[10px] bg-[#C5585F] text-[#ffffff] cursor-pointer">
            팔로우 취소
          </button>
        ) : (
          <button className="w-[100px] h-[24px] text-[14px] rounded-[10px] bg-[#C5585F] text-[#ffffff] cursor-pointer">
            팔로우
          </button>
        )}

        <div></div>
      </div>
    </>
  );
}
