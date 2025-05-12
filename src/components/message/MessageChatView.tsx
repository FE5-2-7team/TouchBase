import { useEffect, useRef } from "react";
import { MessageProps } from "../../types/messageType";

type Props = {
  messages: MessageProps[];
  myId?: string;
};
export default function MessageChatView({ messages, myId }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        ref={scrollRef}
        className="p-5 h-[540px] w-[70%] flex flex-col min-h-[540px] overflow-y-auto "
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-5 flex ${msg.sender?._id === myId ? "justify-end " : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 rounded-xl w-fit max-w-[70%]"  
                ${
                  msg.sender?._id === myId
                    ? "bg-[#305AB3] text-white ml-20 break-words"
                    : "bg-gray-100 text-gray-800 mr-20 break-words dark:bg-[#2D3037] dark:text-white"
                }`}
            >
              <p className="text-lg">{msg.message}</p>
              <p className="text-sm text-right mt-8 whitespace-normal opacity-50 dark:opacity-30">
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleString("ko-KR", {
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
