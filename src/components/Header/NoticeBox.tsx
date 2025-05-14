import { MdClose } from "react-icons/md";
import { Alert } from "./HeaderIcon";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../api/axiosInstance";
import { useChannelStore } from "../../stores/channelStore";

const alertList =
  "border-b border-gray-200 py-1.5 cursor-pointer hover:underline hover:underline-offset-3";

export default function NoticeBox({
  onClose,
  alerts,
  setAlerts,
}: {
  onClose: () => void;
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
}) {
  const navigate = useNavigate();
  const getAlertMessage = (a: Alert) => {
    const sender = a.author?.fullName;

    if (a.message) return `${sender}님이 쪽지를 보냈습니다.`;
    if (a.follow) return `${sender}님이 당신을 팔로우 했습니다.`;
    if (a.comment) return `${sender}님이 댓글을 달았습니다.`;
    if (a.likes) return `${sender}님이 게시글에 좋아요를 눌렀습니다.`;
  };

  const handleAlertClick = async (alert: Alert) => {
    if (!alert.author) return;

    try {
      await axiosInstance.put("/notifications/seen");

      setAlerts((prev) => prev.map((a) => ({ ...a, seen: true })));

      if (alert.message) {
        navigate(`/message/${alert.author._id}`, {
          state: {
            selectedUser: alert.author,
          },
        });
      }
      if (alert.comment) {
        const channelId = alert.post.channel || "unknown";

        const res = await axiosInstance.get(`/channels/${channelId}`);
        const teamName = res.data.name;
        useChannelStore.getState().setChannel(channelId, teamName);
        const postId = alert.likes?.post._id || alert.post?._id || alert.post || "unknown";

        navigate(`/fanpage/${teamName}/${channelId}/${postId}`);
      }
      if (alert.follow) {
        console.log("팔로우 알림 클릭");
        navigate(`/profile/${alert.author._id}/posts`);
      }
    } catch (err) {
      console.error("읽음 처리 실패", err);
    }
  };
  return (
    <>
      <div className="w-86 h-auto pb-2 bg-white border border-gray-200 rounded-md ">
        <button>
          <MdClose onClick={onClose} className="absolute w-5 h-5 right-2 top-2 cursor-pointer" />
        </button>
        {alerts.length === 0 ? (
          <div className="mx-4">
            <p>새로운 알림이 없습니다.</p>
          </div>
        ) : (
          <div className="mx-4">
            {alerts.slice(0, 6).map((a) => (
              <div key={a._id} className={alertList} onClick={() => handleAlertClick(a)}>
                {getAlertMessage(a)}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
