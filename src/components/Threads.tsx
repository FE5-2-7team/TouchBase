import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import ProfileBlock from "./ProfileBlock";
import SimpleProfileCard from "./SimpleProfileCard";
import Comments from "./Comments";

interface ThreadProps {
  username: string;
  title: string;
  date: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
}

export default function Threads({
  username,
  title,
  date,
  content,
  images = [],
  likes,
  comments,
}: ThreadProps) {
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
          <ProfileBlock username={username} />
          {showed && (
            <div className="absolute z-50 w-[285px] top-5 left-[90px]">
              <SimpleProfileCard />
            </div>
          )}
        </div>

        {/* 본문 내용 */}
        <div className="flex flex-col w-full justify-center">
          <div className="flex items-center gap-2 text-[16px] font-semibold text-[#000] mb-[10px]">
            <span>{title}</span>
            <span className="text-[14px] text-[#ababab]">{date}</span>
          </div>
          <div className="text-[16px] text-[#000] mb-[10px]">{content}</div>
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
              <FaRegHeart className="text-[18px]" /> {likes}
            </button>
            <button
              className="flex items-center gap-1"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <FaRegComment className="text-[18px]" /> {comments}
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
