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

      setMessages(res.data);
      console.log("메세지 응답", res.data);
      console.log("유저 아이디", selectedUserId);
    } catch (err) {
      console.error("메세지 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUserId]);
  return (
    <>
      <div className="w-[90%] h-[820px] mb-[125px] ml-14 mt-14 relative ">
        <div className="text-2xl font-semibold my-6 text-gray-800 dark:text-white">
          {selectedUser.fullName || selectedUser.username} 님과의 대화
        </div>
        {messages.length === 0 ? (
          <EmptyMessage message="쪽지를 보내고 대화를 시작해보세요" />
        ) : (
          <div className="flex justify-center items-center">
            <MessageChatView messages={messages} myId={myId} />
          </div>
        )}
      </div>

      <SendMessageForm selectedUserId={selectedUserId} onSend={fetchMessages} />
    </>
  );
}
