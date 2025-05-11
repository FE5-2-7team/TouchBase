import { Link } from "react-router";
import { useEffect, useState } from "react";
import EmptyMessage from "./EmptyMessage";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { axiosInstance } from "../../api/axiosInstance";
import { MessageProps } from "../../types/messageType";
import { userStore } from "../../stores/userStore";

type InboxModeProps = {
  mode: "received" | "sent";
};
export default function InboxMessage({ mode }: InboxModeProps) {
  const [receivedLists, setReceivedLists] = useState<MessageProps[]>([]);
  const [sentLists, setSentLists] = useState<MessageProps[]>([]);

  const formatDate = (time: string) => {
    const date = new Date(time);
    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  };
  const sortHandler = () => {
    const sorted = [...receivedLists].sort((a, b) => {
      return new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime();
    });
    setReceivedLists(sorted);
  };

  useEffect(() => {
    const fetchReceivedMessage = async () => {
      try {
        const res = await axiosInstance.get("/messages/conversations");
        setReceivedLists(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error("받은메세지 불러오기 실패", err);
      }
    };

    fetchReceivedMessage();
  }, []);

  useEffect(() => {
    const fetchSentMessage = async () => {
      try {
        const res = await axiosInstance.get(`/messages/`);
        const allMessage = res.data;
        const myId = userStore.getState().user?._id;

        const onlySent = allMessage.filter((msg: MessageProps) => msg.sender?._id === myId);
        setSentLists(onlySent);
        console.log(allMessage);
      } catch (err) {
        console.error("보낸메세지 불러오기 실패", err);
      }
    };

    fetchSentMessage();
  }, []);

  const list = mode === "received" ? receivedLists : sentLists;
  return (
    <>
      <div className="flex justify-center">
        <div className="md:w-6/7 mb-[125px]">
          <h1 className="text-2xl font-bold mb-20 mt-20 text-center">
            {(mode === "received" && "받은쪽지함") || (mode === "sent" && "보낸쪽지함")}
          </h1>
          {list.length === 0 ? (
            <EmptyMessage
              lists={mode === "received" ? "받은 쪽지가 없습니다." : "보낸 쪽지가 없습니다."}
            />
          ) : (
            <>
              <table className="w-full table-fixed">
                <thead className="border-t-1 border-b-1 border-gray-400 h-10">
                  <tr className="justify-between">
                    <th className="w-20 px-4 text-left text-[16px]">유저 아이디</th>
                    <th className="w-[300px] px-4 text-center text-[16px]">제목</th>
                    <th className="w-32 mb-1 text-right text-[16px]">
                      <div className="flex justify-end mr-5">
                        날짜
                        <button className="ml-2 cursor-pointer" onClick={sortHandler}>
                          <LuArrowDownWideNarrow />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: MessageProps) => {
                    return (
                      <tr key={item._id} className="first:mt-4">
                        <td className="py-2 px-6 ">
                          {mode === "received" ? item.sender?.fullName : item.receiver}
                        </td>
                        <td className="py-2 px-10 whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer hover:font-bold">
                          <Link
                            to={`/message/view/${
                              mode === "received" ? item.sender?._id : item.receiver
                            }`}
                          >
                            {item.message}
                          </Link>
                        </td>
                        <td className="w-32 py-2 px-4 text-right">
                          {item.createdAt && formatDate(item.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
}
