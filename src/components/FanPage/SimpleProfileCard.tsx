import { useState } from "react";
import ProfileImage from "./ProfileImage";
import { FaUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface ProfileCardProps {
  userId: string;
  username: string;
  profileImage?: string;
  isOnline: boolean;
  followerNum: number;
  followingNum: number;
}

export default function SimpleProfileCard({
  userId,
  username,
  profileImage,
  isOnline,
  followerNum,
  followingNum,
}: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState("posts");

  const stats = [
    { id: "posts", label: "게시물", count: 10 },
    { id: "followers", label: "팔로워", count: 10 },
    { id: "following", label: "팔로잉", count: 10 },
  ];

  console.log(isOnline);

  return (
    <div className="w-full max-w-[285px] bg-[#F5F5F5] dark:bg-gray-900 mx-auto shadow-md rounded-[10px] border-2 border-[#d9d9d9] p-4 flex items-center gap-6">
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center gap-1">
        <div className="border border-[#d9d9d9] rounded-full bg-[#0033A0] flex items-center justify-center">
          {profileImage ? (
            <div className="relative w-[60px] h-[60px]">
              <img src={profileImage} alt="profile" className="w-full h-full rounded-full" />
              <div
                className={twMerge(
                  "absolute w-[9px] h-[9px] right-[1px] top-[5px] rounded-[100px] bg-[#00FF1E] dark:border dark:border-[#0033A0]",
                  !isOnline && "hidden"
                )}
              />
            </div>
          ) : (
            <div className="relative w-[60px] h-[60px]">
              <ProfileImage size={60} />
              <div
                className={twMerge(
                  "absolute w-[9px] h-[9px] right-[1px] top-[5px] rounded-[100px] bg-[#00FF1E] dark:border dark:border-[#0033A0]",
                  !isOnline && "hidden"
                )}
              />
            </div>
          )}
        </div>
        <div className="text-[12px] text-center font-bold">{username}</div>
      </div>

      {/* 사용자 정보 */}
      <div className="flex flex-col flex-grow gap-2">
        {/* 통계 정보 */}
        <div className="flex gap-3 text-[10px] cursor-pointer">
          {stats.map(({ id, label, count }) => (
            <span
              key={id}
              onClick={() => setActiveTab(id)}
              className={`font-semibold ${activeTab === id ? "text-[#FF8A00]" : `text-[#0033a0] dark:text-white`}`}
            >
              {label} {count}
            </span>
          ))}
        </div>

        <button className="px-4 py-1 rounded-[6px] border bg-[#fff] border-[#d6d6d6] text-[10px] text-[#333] hover:bg-[#0033a0] hover:text-[#fff] transition">
          팔로우
        </button>
      </div>
    </div>
  );
}
