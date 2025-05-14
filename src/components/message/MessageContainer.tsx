import { useEffect, useState } from "react";
import SendMessageForm from "./SendMessageForm";
import { MessageProps } from "../../types/messageType";
import MessageChatView from "./MessageChatView";
import { axiosInstance } from "../../api/axiosInstance";
import { userStore } from "../../stores/userStore";
import { useParams, useLocation } from "react-router";
import { ExtendedUser } from "../../types/postType";
import EmptyMessage from "./EmptyMessage";

export default function MessageContainer() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const myId = userStore.getState().getUser()?._id;
  const { id: selectedUserId } = useParams();
  const location = useLocation();
  const selectedUser = location.state?.selectedUser as ExtendedUser;

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get(`/messages?userId=${selectedUserId}`);

      const sorted = res.data.sort(
        (a: MessageProps, b: MessageProps) =>
          new Date(a.createdAt ?? "").getTime() - new Date(b.createdAt ?? "").getTime()
      );
      setMessages(sorted);
    } catch (err) {
      console.error("메세지 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUserId]);

  return (
    <>
      <div className="w-[100%] mb-[125px] items-center mt-12 relative ">
        <div className="flex ml-50 text-2xl  font-semibold my-6 text-gray-800 dark:text-white">
          {selectedUser.fullName || selectedUser.username} 님과의 쪽지
        </div>
        {messages.length === 0 ? (
          <EmptyMessage message="쪽지를 보내고 대화를 시작해보세요" />
        ) : (
          <div className="flex justify-center items-center ">
            <MessageChatView messages={messages} myId={myId} />
          </div>
        )}
        <div className="flex justify-center">
          <SendMessageForm selectedUserId={selectedUserId} onSend={fetchMessages} />
        </div>
      </div>
    </>
  );
}
