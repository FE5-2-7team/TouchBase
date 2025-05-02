import HeartIcon from "../icons/HeartIcon";
import CommentIcon from "../icons/CommentIcon";
import ProfileBlock from "./ProfileBlock";
import SimpleProfileCard from "./SimpleProfileCard";
import { useState } from "react";
import Comments from "./Comments";

export default function Threads() {
  const [showed, setShowed] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // 이미지
  const images = [
    "https://www.doosanbears.com/_next/image?url=%2Fimages%2Fimg_mascot_2025.jpg&w=640&q=75",
  ];

  return (
    <div
      className="w-full max-w-[1200px] relative mx-auto shadow-md rounded-[10px] 
      border border-[#d9d9d9] bg-white p-[24px] flex flex-col gap-[20px]"
    >
      <div className="flex gap-[25px]">
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

        <div className="flex flex-col w-full justify-center">
          <div className="flex items-center gap-2 text-[16px] font-semibold text-[#000] mb-[10px]">
            <span>제목</span>
            <span className="text-[14px] text-[#ababab]">25.04.29</span>
          </div>

          <div className="text-[16px] text-[#000] mb-[10px]">
            두산 경기 보러 갈 사람
          </div>

          {/* 이미지가 있을 때만 보여주기 */}
          {images.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-2">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`img-${index}`}
                  className="w-[70%] rounded-[6px]"
                />
              ))}
            </div>
          )}

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
