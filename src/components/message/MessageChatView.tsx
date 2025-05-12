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
        {messages.map((msg, idx) => {
          const isMine = msg.sender?._id === myId;

          return (
            <div key={idx} className={`mb-5 flex ${isMine ? "justify-end " : "justify-start"}`}>
              <div className="flex flex-col mr-2 items-end">
                <div
                  className={`px-4 py-3 rounded-xl max-w-[80%] w-auto"  
                ${
                  msg.sender?._id === myId
                    ? "bg-[#305AB3] text-white ml-20 break-words self-end"
                    : "bg-gray-100 text-gray-800 mr-20 break-words dark:bg-[#2D3037] dark:text-white self-start"
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
                {isMine && (
                  <p className="text-xs text-right mt-1 opacity-60">
                    {msg.seen ? "읽음" : "안읽음"}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
