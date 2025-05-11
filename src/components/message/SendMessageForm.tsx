import { useState } from "react";
import SendButton from "./SendButton";
import { axiosInstance } from "../../api/axiosInstance";

export default function SendMessageForm({
  selectedUserId,
  onSend,
}: {
  selectedUserId: string | undefined;
  onSend: () => void;
}) {
  const [content, setContent] = useState("");

  const sendHandler = async () => {
    if (!content) return;
    try {
      await axiosInstance.post("/messages/create", {
        receiver: selectedUserId,
        message: content,
      });
      setContent("");
      onSend();
    } catch (err) {
      console.error("메세지 보내기 실패", err);
    }
  };
  return (
    <>
      <div className="flex w-[62%] border-1 border-gray-200 rounded-2xl absolute items-baseline bottom-0">
        <textarea
          className="p-4 h-32 w-[60%] border-gray-300 resize-none focus:outline-none"
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <SendButton onClick={sendHandler} />
      </div>
    </>
  );
}
