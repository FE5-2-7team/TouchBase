import { useState } from "react";

export default function SimpleProfileCard() {
  const [activeTab, setActiveTab] = useState("posts");

  const stats = [
    { id: "posts", label: "게시물", count: 10, defaultColor: "#0033A0" },
    { id: "followers", label: "팔로워", count: 10, defaultColor: "#0033A0" },
    { id: "following", label: "팔로잉", count: 10, defaultColor: "#0033A0" },
  ];

  return (
    <div className="w-full max-w-[285px] bg-[#F5F5F5] mx-auto shadow-md rounded-[10px] border-2 border-[#d9d9d9] p-4 flex items-center gap-6">
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-[60px] border border-[#d9d9d9] h-[60px] rounded-full bg-[#0033A0] flex items-center justify-center overflow-hidden">
          <img
            src="https://www.doosanbears.com/_next/image?url=%2Fimages%2Fimg_symbol_2025_1.jpg&w=256&q=75"
            alt="profile"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="text-[12px] text-center font-bold">User name</div>
      </div>

      {/* 사용자 정보 */}
      <div className="flex flex-col flex-grow gap-2">
        {/* 통계 정보 */}
        <div className="flex gap-3 text-[10px] cursor-pointer">
          {stats.map(({ id, label, count, defaultColor }) => (
            <span
              key={id}
              onClick={() => setActiveTab(id)}
              className={`font-semibold ${
                activeTab === id ? "text-[#FF8A00]" : `text-[${defaultColor}]`
              }`}
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
