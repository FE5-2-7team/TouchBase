import { useEffect, useState } from "react";
import { MessageProps, Sender } from "../../types/messageType";
import { axiosInstance } from "../../api/axiosInstance";
import { userStore } from "../../stores/userStore";
import { Link } from "react-router";

export default function SideMessageList() {
  const [lists, setLists] = useState<MessageProps[]>([]);
  const myId = userStore.getState().getUser()?._id;

  const fetchMessageList = async () => {
    try {
      const res = await axiosInstance.get("/messages/conversations");

      const sorted = res.data.sort(
        (a: MessageProps, b: MessageProps) =>
          new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime()
      );
      setLists(sorted);
    } catch (err) {
      console.error("메세지 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchMessageList();
  }, []);

  return (
    <>
      <ul className="mt-10 w-[258px] overflow-scroll">
        {lists.map((list) => {
          const selectedUser = (list.sender?._id === myId ? list.receiver : list.sender) as Sender;

          return (
            <li key={list._id} className="h-18 px-3 pb-2 pt-1 hover:bg-gray-200">
              <Link to={`/message/${selectedUser._id}`} state={{ selectedUser: selectedUser }}>
                <div className="flex justify-between mt-1">
                  <div className="text-md">{selectedUser.fullName}</div>
                  <div className="text-xs text-right text-gray-500">
                    {list.createdAt &&
                      new Date(list.createdAt).toLocaleString("ko-KR", {
                        month: "long",
                        day: "numeric",
                      })}
                  </div>
                </div>

                <div className="text-md line-clamp-1 text-gray-400 mt-2">{list.message}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
