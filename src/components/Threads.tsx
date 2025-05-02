import HeartIcon from "../icons/HeartIcon";
import CommentIcon from "../icons/CommentIcon";
import ProfileBlock from "./ProfileBlock";
import SimpleProfileCard from "./SimpleProfileCard";
import { useState } from "react";
import Comments from "./Comments";

export default function Threads() {
  const [showed, setShowed] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      className="w-full max-w-[1200px] relative mx-auto shadow-md rounded-[10px] 
      border border-[#d9d9d9] bg-white p-[24px] flex flex-col gap-[20px]"
    >
      {/* 상단: 프로필 + 본문 */}
      <div className="flex gap-[25px]">
        {/* 왼쪽 고정 프로필 */}
        <div
          onMouseEnter={() => setShowed(true)}
          onMouseLeave={() => setShowed(false)}
        >
          <ProfileBlock username="user name" />
          {showed && (
            <div className="absolute z-50 w-[285px] top-5 left-[90px]">
              <SimpleProfileCard />
            </div>
          )}
        </div>

        {/* 본문 내용 */}
        <div className="flex flex-col w-full justify-center">
          <div className="flex items-center gap-2 text-[16px] font-semibold text-[#000] mb-[10px]">
            <span>제목</span>
            <span className="text-[14px] text-[#ababab]">25.04.29</span>
          </div>
          <div className="text-[16px] text-[#000] mb-[10px]">
            두산 경기 보러 갈 사람
          </div>
          <div className="flex items-center gap-8 text-[#ababab] text-[16px] mt-auto">
            <button className="flex items-center gap-1">
              <HeartIcon /> 25
            </button>
            <button
              className="flex items-center gap-1"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <CommentIcon /> 25
            </button>
          </div>
        </div>
      </div>

      {showComments && (
        <div className="w-full overflow-hidden transition-all ease-in-out">
          <Comments />
        </div>
      )}
    </div>
  );
}
