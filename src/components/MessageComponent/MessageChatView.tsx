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
      <div ref={scrollRef} className="p-5 w-[77%] ml-4 overflow-y-auto h-[550px] flex flex-col">
        {messages.map((msg, idx) => {
          const isMine = msg.sender?._id === myId;

          return (
            <div key={idx} className={`mb-2.5 flex ${isMine ? "justify-end " : "justify-start"}`}>
              <div className="flex flex-col mr-2 w-full">
                <div
                  className={`w-[80%] px-4 py-3 rounded-xl break-words
                ${
                  isMine
                    ? " bg-[#305AB3] text-white ml-20 self-end"
                    : "bg-gray-100 text-gray-800 mr-20 mb-1.5 break-words dark:bg-[#2D3037] dark:text-white self-start"
                }`}
                >
                  <p className="text-lg text-left ml-2 whitespace-normal opacity-50 dark:opacity-30">
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
                  <p className="text-lg mt-10 mb-2 ml-2 justify-baseline">{msg.message}</p>
                </div>
                {isMine && (
                  <p className="text-xs mt-0.5 text-right opacity-60">
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
