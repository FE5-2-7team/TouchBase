import { useState } from "react";
import ProfileImage from "./ProfileImage";
import { FaUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "../../api/axiosInstance";
import { ExtendedUser, Follow } from "../../types/postType";
import { refreshStore } from "../../stores/refreshStore";
import useGetUser from "../Profile/useGetUser";

interface ProfileCardProps {
  loginUserId: string;
  author: ExtendedUser;
}

export default function SimpleProfileCard({ loginUserId, author }: ProfileCardProps) {
  // const [activeTab, setActiveTab] = useState("posts");
  const refetch = refreshStore((state) => state.refetch);
  const authorDetails = useGetUser(author._id);

  const stats = [
    { id: "posts", label: "게시물", count: author.posts.length },
    { id: "followers", label: "팔로워", count: author.followers.length },
    { id: "following", label: "팔로잉", count: author.following.length },
  ];

  const following = authorDetails?.followers.find((follow) => follow.follower === loginUserId);

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
        userId: author._id,
      });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-[285px] bg-[#F5F5F5] dark:bg-gray-900 mx-auto shadow-md rounded-[10px] border-2 border-[#d9d9d9] p-4 flex items-center gap-6">
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center gap-1">
        <div className="border border-[#d9d9d9] rounded-full bg-[#0033A0] flex items-center justify-center">
          {author.image ? (
            <div className="relative w-[60px] h-[60px]">
              <img src={author.image} alt="profile" className="w-full h-full rounded-full" />
              <div
                className={twMerge(
                  "absolute w-[9px] h-[9px] right-[1px] top-[5px] rounded-[100px] bg-[#00FF1E] dark:border dark:border-[#0033A0]",
                  !author.isOnline && "hidden"
                )}
              />
            </div>
          ) : (
            <div className="relative w-[60px] h-[60px]">
              <ProfileImage size={60} />
              <div
                className={twMerge(
                  "absolute w-[9px] h-[9px] right-[1px] top-[5px] rounded-[100px] bg-[#00FF1E] dark:border dark:border-[#0033A0]",
                  !author.isOnline && "hidden"
                )}
              />
            </div>
          )}
        </div>
        <div className="text-[12px] text-center font-bold">{author.username ? author.username : author.fullName}</div>
      </div>

      {/* 사용자 정보 */}
      <div className="flex flex-col flex-grow gap-2">
        {/* 통계 정보 */}
        <div className="flex gap-3 text-[10px] cursor-pointer">
          {stats.map(({ id, label, count }) => (
            <span
              key={id}
              className="dark:text-white text-[10px]"
              // onClick={() => setActiveTab(id)}
              // className={`font-semibold ${activeTab === id ? "text-[#FF8A00]" : `text-[#0033a0] dark:text-white`}`}
            >
              {label} {count}
            </span>
          ))}
        </div>

        {author._id === loginUserId ? (
          <button className="px-4 py-1 rounded-[6px] border bg-[#fff] border-[#d6d6d6] text-[10px] text-[#333] hover:bg-[#0033a0] hover:text-[#fff] transition">
            내 프로필 가기
          </button>
        ) : following ? (
          <button
            className="px-4 py-1 rounded-[6px] border bg-[#fff] border-[#d6d6d6] text-[10px] text-[#333] hover:bg-[#0033a0] hover:text-[#fff] transition"
            onClick={unfollowHandler}
          >
            팔로우 취소
          </button>
        ) : (
          <button
            className="px-4 py-1 rounded-[6px] border bg-[#fff] border-[#d6d6d6] text-[10px] text-[#333] hover:bg-[#0033a0] hover:text-[#fff] transition"
            onClick={followHandler}
          >
            팔로우
          </button>
        )}
      </div>
    </div>
  );
}
