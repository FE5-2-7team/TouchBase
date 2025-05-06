// 받은 쪽지, 보낸쪽지, 쪽지보내기
import Swal from "sweetalert2";
import "animate.css";
import { useNavigate } from "react-router";
import { useState } from "react";

export interface Sender {
  _id: string;
  fullName: string;
}

export type MessageMode = "write" | "received" | "sent" | "reply";

export interface MessageProps {
  mode: MessageMode;
  sender?: Sender;
  receiver?: string;
  seen?: false;
  createdAt?: string;
  content?: string;
  message?: string;
}

export default function MessageContainer({ mode, sender, createdAt, content }: MessageProps) {
  const sendButtonHandler = (content: string) => {
    if (!content) {
      Swal.fire({
        title: "내용을 입력해주세요",
        icon: "warning",
        toast: true,
        position: "bottom",
        timer: 1500,
        showConfirmButton: false,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    } else {
      Swal.fire({
        title: "쪽지가 전송되었습니다!",
        icon: "none",
        toast: true,
        position: "bottom",
        timer: 1500,
        showConfirmButton: false,
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
      });
    }
  };
  const navigate = useNavigate();

  const [text, setText] = useState("");
  console.log(sender);
  return (
    <>
      <div className="flex justify-center">
        <div className="md:w-6/7 mb-[125px]">
          <h1 className="text-2xl font-bold mb-8 mt-20 text-center mx-auto w-fit border-b-4 border-[#0033A0] whitespace-nowrap">
            {mode === "write" ? "쪽지보내기" : mode === "received" ? "받은 쪽지" : "보낸 쪽지"}
          </h1>
          <div className="w-full border border-gray-300">
            <div className="flex mt-3">
              <>
                {mode === "write" || mode === "reply" ? (
                  <>
                    <strong className="mx-10 mt-4 text-[20px]">받으실 분</strong>
                    <div className="px-6 mt-2">
                      <input
                        type="text"
                        className={`border border-gray-300 p-1 m-1.5 focus:ring-0 outline-none ${
                          mode === "reply" ? "bg-gray-100 text-gray-600" : ""
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
            <div className="flex border-b border-b-gray-300">
              <strong className="mx-10 mb-4 text-xl">{mode === "write" ? "" : "받은 시간"}</strong>
              <p className="text-[18px]">{mode === "write" ? "" : createdAt}</p>
            </div>
            <div className="w-full h-[380px] mt-10 px-10">
              {mode === "write" || mode === "reply" ? (
                <textarea
                  className="w-full h-[380px] resize-none px-6 outline-none focus:ring-0"
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              ) : (
                <p>{content}</p>
              )}
            </div>
            <div className="flex justify-end mb-6 mr-2 px-3">
              {mode === "write" ? (
                <div className="flex justify-end mb-6 mr-2 px-3">
                  <button
                    className=" justify-end bg-[#0033A0] text-white rounded-[10px] px-7 py-2 text-sm cursor-pointer "
                    onClick={() => sendButtonHandler(text)}
                  >
                    POST
                  </button>
                </div>
              ) : (
                <button
                  className=" justify-end bg-[#0033A0] text-white rounded-[10px] px-7 py-2 text-sm cursor-pointer"
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
