import { FaUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import useGetUser from "./useGetUser";
import { ExtendedUser, Follow } from "../../types/postType";
import { axiosInstance } from "../../api/axiosInstance";
import { refreshStore } from "../../stores/refreshStore";

export default function FollowCard({ followId, profileId }: { followId: string; profileId: string }) {
  const userDetails: ExtendedUser | undefined = useGetUser(followId);
  const refetch = refreshStore((state) => state.refetch);

  const following = userDetails?.followers.find((follow) => follow.follower === profileId);

  const unfollowHandler = async () => {
    try {
      const { data } = await axiosInstance.delete<Follow>("follow/delete", {
        data: { id: following?._id },
      });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const followHandler = async () => {
    try {
      const { data } = await axiosInstance.post<Follow>("follow/create", {
        userId: followId,
      });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex items-center border border-[#335CB3] dark:border-[#FFFFFF] rounded-[10px] w-[470px] h-[63px] justify-between px-[13px] my-[5px]">
        <div className="relative w-[34px] h-[34px]">
          <FaUserCircle className="absolute w-full h-full fill-[#0033A0] dark:fill-[#FFFFFF]" />
          <div
            className={twMerge(
              "absolute w-[8px] h-[8px] right-[1px] rounded-[100px] bg-[#00FF1E] dark:border dark:border-[#0033A0]",
              !userDetails?.isOnline && "hidden"
            )}
          />
        </div>
        <div className="text-[16px] text-[#6D6D6D] dark:text-[#FFFFFF] w-[170px]">
          {userDetails?.username ? userDetails?.username : userDetails?.fullName}
        </div>
        <button className="w-[100px] h-[24px] text-[14px] rounded-[10px] bg-[#0033A0] text-[#ffffff] cursor-pointer">
          쪽지 보내기
        </button>
        {following ? (
          <button
            className="w-[100px] h-[24px] text-[14px] rounded-[10px] bg-[#C5585F] text-[#ffffff] cursor-pointer"
            onClick={unfollowHandler}
          >
            팔로우 취소
          </button>
        ) : (
          <button
            className="w-[100px] h-[24px] text-[14px] rounded-[10px] bg-[#C5585F] text-[#ffffff] cursor-pointer"
            onClick={followHandler}
          >
            팔로우
          </button>
        )}
      </div>
    </>
  );
}
