import { useState } from "react";
import ProfileImage from "./ProfileImage";
import Button from "./Button";

export default function Comments() {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "username5",
      text: "퍼블리싱하기 빡세군요..",
      date: "25.04.29 19:50",
    },
    {
      id: 2,
      user: "username6",
      text: "ㄷㄷ 기능이 더 빡세겠죠?",
      date: "25.04.29 19:50",
    },
  ]);

  const formatDate = (date: Date) => {
    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yy}.${mm}.${dd} ${hh}:${min}`;
  };

  const handleSubmit = () => {
    if (input.trim() === "") return;

    const now = new Date();
    const newComment = {
      id: Date.now(),
      user: "me",
      text: input,
      date: formatDate(now),
    };
    setComments([newComment, ...comments]);
    setInput("");
  };

  return (
    <div className="flex flex-col gap-3 mt-2">
      {/* 댓글 입력 */}
      <div className="flex items-center gap-2 w-full py-2">
        <ProfileImage size={32} />
        <input
          type="text"
          placeholder="댓글을 입력해 주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow h-[36px] px-3 text-sm border border-[#d9d9d9] rounded-[10px] focus:outline-none"
        />
        <Button onClick={handleSubmit}>POST</Button>
      </div>

      {/* 댓글 목록 */}
      <div className="flex flex-col gap-2  max-h-[320px] overflow-y-auto pr-1">
        {comments.slice(0, 4).map((comment) => (
          <div key={comment.id} className="flex items-center gap-2 w-full">
            <ProfileImage size={32} />
            <div className="flex flex-col w-full">
              <span className="font-semibold">{comment.user}</span>

              {/* 댓글 본문 + 날짜를 좌우로 정렬 */}
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-[#333]">{comment.text}</span>
                <span className="pb-[20px] pr-[5px] text-[12px] text-[#999]">
                  {comment.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
