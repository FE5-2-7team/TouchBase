// 받은 쪽지, 보낸쪽지, 쪽지보내기
export interface Sender {
  _id: string;
  fullName: string;
}

export type MessageMode = "write" | "received" | "sent";

export interface MessageProps {
  mode: MessageMode;
  sender?: Sender;
  receiver?: string;
  seen?: false;
  createdAt: string;
  content: string;
  message?: string;
}

export default function MessageContainer({ mode, sender, createdAt, content }: MessageProps) {
  return (
    <>
      <div className="flex justify-center">
        <div className="md:w-6/7 mb-[125px]">
          <h1 className="text-2xl font-bold mb-8 mt-20 text-center mx-auto w-fit border-b-4 border-[#0033A0] whitespace-nowrap">
            {mode === "write" ? "쪽지보내기" : mode === "received" ? "받은 쪽지" : "보낸 쪽지"}
          </h1>
          <div className="w-full border border-gray-300">
            <div className="flex mt-3">
              {mode === "write" ? (
                <>
                  <strong className="pr-10 ml-8 mt-4 text-[20px]">받으실 분</strong>
                  <div className="px-6 mt-2 ">
                    <input
                      type="text"
                      className="border border-gray-300 p-1 m-1.5 focus:ring-0 outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <strong className="mx-8 mt-3 mb-3 text-[20px]">
                    {mode === "received" ? "보내신 분" : "받으신 분"}
                  </strong>
                  <p className="px-6 pb-6 mt-2">{sender?.fullName}</p>
                </>
              )}
            </div>
            <div className="flex ml-8 border-b border-b-gray-300">
              <strong className="pr-10 mb-4 text-xl">{mode === "write" ? "" : "받은 시간"}</strong>
              <p className="mt-1 text-[16px]">{mode === "write" ? "" : createdAt}</p>
            </div>
            <div className="w-full h-[380px] mt-10 px-10">
              {mode === "write" ? (
                <textarea className="w-full h-[380px] resize-none px-6 outline-none focus:ring-0"></textarea>
              ) : (
                <p>{content}</p>
              )}
            </div>
            <div className="flex justify-end mb-6 mr-2 px-3">
              {mode === "write" ? (
                <div className="flex justify-end mb-6 mr-2 px-3">
                  <button className=" justify-end bg-[#0033A0] text-white rounded-[10px] px-7 py-2 text-sm cursor-pointer">
                    POST
                  </button>
                </div>
              ) : (
                <button className=" justify-end bg-[#0033A0] text-white rounded-[10px] px-7 py-2 text-sm cursor-pointer">
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
