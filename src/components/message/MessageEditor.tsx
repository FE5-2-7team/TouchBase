import { useState } from "react";
import { MessageProps } from "../../types/messageType";
import SendButton from "./SendButton";
import { sendButtonHandler } from "./Toast";
import { axiosInstance } from "../../api/axiosInstance";

// 쪽지 보내기, 답장하기
export default function MessageEditor({ mode, sender, createdAt }: MessageProps) {
  // 받는 사람
  const [receiver, setReceiver] = useState("");
  // 쪽지내용
  const [messageText, setMessageText] = useState("");

  const sendHandler = async () => {
    const message = messageText;
    const receiverId = mode === "reply" ? sender?._id : receiver;
    if (!message || !receiverId) {
      sendButtonHandler("");
      return;
    }

    try {
      const res = await axiosInstance.post("/messages/create", {
        message: messageText,
        receiverId: receiver,
      });
      sendButtonHandler(messageText);

      setMessageText("");
      setReceiver("");
      return res.data;
    } catch (err) {
      console.error("전송 실패!", err);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="md:w-6/7 mb-[125px]">
          <h1 className="text-2xl font-bold mb-8 mt-20 text-center mx-auto w-fit border-b-4 border-[#0033A0] dark:border-b-[#235BD2] whitespace-nowrap">
            {(mode === "write" && "쪽지보내기") || (mode === "reply" && "답장하기")}
          </h1>
          <div className="w-full border border-gray-300 dark:border-gray-700">
            <div className="flex mt-3">
              <>
                {mode === "write" || mode === "reply" ? (
                  <>
                    <strong className="ml-10 mr-6 mt-3 text-[20px]">받으실 분</strong>
                    <div className="mt-1">
                      <input
                        type="text"
                        className={`border border-gray-400 p-1 m-1.5 focus:ring-0 outline-none dark:border-gray-700 ${
                          mode === "reply" ? "bg-gray-100 text-gray-600 " : ""
                        }`}
                        value={mode === "reply" ? sender?._id ?? "" : receiver}
                        readOnly={mode === "reply"}
                        onChange={(e) => setReceiver(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <strong className="mx-10 mt-2 mb-4 text-[20px]">
                      {mode === "received" && "보내신 분"}
                    </strong>
                    <p className="px-6 pb-6 mt-2">{sender?.fullName}</p>
                  </>
                )}
              </>
            </div>
            <div className="flex border-b border-b-gray-700">
              <strong className="mx-10 mb-4 text-xl dark:text-white">
                {mode === "write" ? "" : "받은 시간"}
              </strong>
              <p className="text-[18px] dark:text-white">{mode === "write" ? "" : createdAt}</p>
            </div>
            <div className="w-full h-[380px] mt-10 px-10">
              {(mode === "write" || mode === "reply") && (
                <textarea
                  className="w-full h-[380px] resize-none px-4 outline-none focus:ring-0"
                  onChange={(e) => setMessageText(e.target.value)}
                  value={messageText}
                ></textarea>
              )}
            </div>
            <SendButton onClick={sendHandler} mode={mode} sender={sender} />
          </div>
        </div>
      </div>
    </>
  );
}
