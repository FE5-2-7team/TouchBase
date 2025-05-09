import { useCallback, useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import { Comment } from "../../types/postType";
import axios from "axios";
interface CommentsProps {
  postId: string;
  commentList: Comment[];
  setCommentList: React.Dispatch<React.SetStateAction<Comment[]>>;
}
export default function Comments({
  postId,
  commentList,
  setCommentList,
}: CommentsProps) {
  const [input, setInput] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`http://13.125.208.179:5011/posts/${postId}`);

      setCommentList(res.data.comments);
      console.log(res.data.comments);
    } catch (error) {
      console.log("댓글 불러오기 실패", error);
    }
  }, [postId, setCommentList]);

  const handleSubmit = async () => {
    if (input.trim() === "") return;

    try {
      const res = await axios.post<Comment>(
        "http://13.125.208.179:5011/comments/create",
        {
          comment: input,
          postId: postId,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4MGRmMTI1NjA0NmM1N2E1N2Q3MjE0MCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20ifSwiaWF0IjoxNzQ1NzQ1MDU0fQ.OFaaM-peU3XGKl_GwCWt7JOfuFXcm9FzImVVMj6Xd88",
            "Content-Type": "application/json",
          },
        }
      );
      const createdComment = res.data;
      setCommentList((prev) => [createdComment, ...prev]);
      setInput("");
    } catch (error) {
      console.log("댓글 작성 실패", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const formateDate = (newDate: string) => {
    const date = new Date(newDate);

    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yy}.${mm}.${dd} ${hh}:${min}`;
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="flex-grow h-[36px] px-3 text-sm border border-[#d9d9d9] rounded-[10px] focus:outline-none"
        />
        <Button onClick={handleSubmit}>POST</Button>
      </div>

      {/* 댓글 목록 */}
      <div className="flex flex-col gap-2  max-h-[320px] overflow-y-auto pr-1">
        {Array.isArray(commentList) &&
          commentList.map((comment) => (
            <div key={comment._id} className="flex items-center gap-2 w-full">
              <ProfileImage size={32} />
              <div className="flex flex-col w-full">
                <span className="font-semibold">
                  {comment.author?.fullName || "익명"}
                </span>

                {/* 댓글 본문 + 날짜를 좌우로 정렬 */}
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm">{comment.comment}</span>
                  <span className="pb-[20px] pr-[5px] text-[12px] text-[#999]">
                    {formateDate(comment.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
