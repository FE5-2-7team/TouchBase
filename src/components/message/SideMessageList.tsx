import { useEffect, useState } from "react";
import { MessageProps, Sender } from "../../types/messageType";
import { axiosInstance } from "../../api/axiosInstance";
import { userStore } from "../../stores/userStore";
import { useNavigate } from "react-router";

export default function SideMessageList() {
  const [lists, setLists] = useState<MessageProps[]>([]);
  const [readMessage, setReadMessage] = useState<string[]>([]);
  const myId = userStore.getState().getUser()?._id;
  const navigate = useNavigate();

  const fetchMessageList = async () => {
    try {
      const res = await axiosInstance.get("/messages/conversations");

      const sorted = res.data.sort(
        (a: MessageProps, b: MessageProps) =>
          new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime()
      );
      setLists(sorted);
      console.log("conversations:", res.data);
    } catch (err) {
      console.error("메세지 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchMessageList();
  }, []);

  return (
    <>
      <ul className="mt-10 w-[258px] overflow-y-auto">
        {lists.map((list) => {
          const selectedUser = (list.sender?._id === myId ? list.receiver : list.sender) as Sender;
          const isSeen = list.seen || readMessage.includes(selectedUser._id);
          return (
            <li
              key={list._id}
              className="h-18 px-3 pb-2 pt-1 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-opacity-70"
              onClick={async () => {
                const isUnread =
                  list.sender?._id === selectedUser._id &&
                  list.receiver?._id === myId &&
                  !list.seen;

                if (isUnread) {
                  try {
                    await axiosInstance.put("/messages/update-seen", {
                      userId: selectedUser._id,
                    });

                    setReadMessage((prev) => [...prev, selectedUser._id]);
                    await fetchMessageList();
                  } catch (err) {
                    console.log("읽음 처리 실패", err);
                  }
                }
                navigate(`/message/${selectedUser._id}`, {
                  state: { selectedUser },
                });
              }}
            >
              <div className="flex justify-between mt-1">
                <div className="text-md dark:text-white">{selectedUser.fullName}</div>
                <div className="text-xs text-right text-gray-500 dark:text-gray-400">
                  {list.createdAt &&
                    new Date(list.createdAt).toLocaleString("ko-KR", {
                      month: "long",
                      day: "numeric",
                    })}
                </div>
              </div>

              <div
                className={`text-md line-clamp-1 mt-2
                    ${isSeen ? "text-gray-500 dark:text-gray-600" : "dark:text-white text-black"} `}
              >
                {list.message}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
