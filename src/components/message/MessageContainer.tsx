// // 받은 쪽지, 보낸쪽지, 쪽지보내기

import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Sender,
  MessageMode,
  MessageProps,
  MessageType,
} from "../../types/messageType";

type MixType = MessageMode & MessageProps & MessageType & Sender;
export default function MessageContainer({
  mode,
  sender,
  createdAt,
  content,
  userId,
  title,
  date,
}: MixType) {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  return (
    <>
      <div className="flex justify-center">
        <div className="md:w-6/7 mb-[125px]">
          <h1 className="text-2xl font-bold mb-8 mt-20 text-center mx-auto w-fit border-b-4 border-[#0033A0] dark:border-b-[#235BD2] whitespace-nowrap">
            {mode === "write"
              ? "쪽지보내기"
              : mode === "received"
              ? "받은 쪽지"
              : "보낸 쪽지"}
          </h1>
          <div className="w-full border border-gray-300 dark:border-gray-700">
            <div className="flex mt-3">
              <>
                {mode === "write" || mode === "reply" ? (
                  <>
                    <strong className="ml-10 mr-6 mt-3 text-[20px]">
                      받으실 분
                    </strong>
                    <div className="mt-1">
                      <input
                        type="text"
                        className={`border border-gray-400 p-1 m-1.5 focus:ring-0 outline-none dark:border-gray-700 ${
                          mode === "reply" ? "bg-gray-100 text-gray-600 " : ""
                        }`}
                        value={mode === "reply" ? sender?._id : undefined}
                        readOnly={mode === "reply"}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <strong className="mx-10 mt-2 mb-4 text-[20px]">
                      {mode === "received" ? "보내신 분" : "받으신 분"}
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
              <p className="text-[18px] dark:text-white">
                {mode === "write" ? "" : createdAt}
              </p>
            </div>
            <div className="w-full h-[380px] mt-10 px-10">
              {mode === "write" || mode === "reply" ? (
                <textarea
                  className="w-full h-[380px] resize-none px-4 outline-none focus:ring-0"
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              ) : (
                <p>{content}</p>
              )}
            </div>
            <div className="flex justify-end mb-6 mr-2 px-3">
              {mode === "write" ? (
                <div className="flex justify-end mt-10 mr-2 px-3">
                  <button
                    className="justify-end bg-[#0033A0] border hover:bg-[#fff] hover:border-1 hover:text-[#0033A0] text-white rounded-[10px] px-7 mb-2 py-2 text-sm cursor-pointer dark:hover:bg-white dark:border-[#0033A0] dark:hover:border-[#0033A0] dark:hover:text-[#0033A0] "
                    onClick={() => sendButtonHandler(text)}
                  >
                    보내기
                  </button>
                </div>
              ) : (
                <button
                  className="justify-end bg-[#0033A0] border hover:bg-[#fff] hover:border-1 hover:text-[#0033A0] text-white rounded-[10px] px-7 mb-2 py-2 text-sm cursor-pointer dark:hover:bg-white dark:border-[#0033A0] dark:hover:border-[#0033A0] dark:hover:text-[#0033A0] "
                  onClick={() => navigate(`/message/write/${sender?._id}`)}
                >
                  답장하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
