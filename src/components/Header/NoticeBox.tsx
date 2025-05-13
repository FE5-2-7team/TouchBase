import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { axiosInstance } from "../../api/axiosInstance";
const alertList = "border-b border-gray-200 py-1.5 cursor-pointer";

export default function NoticeBox({ onClose }: { onClose: () => void }) {
  const [alert, setalert] = useState([]);

  const fetchAlert = async () => {
    try {
      const res = await axiosInstance.get("/notifications");
      setalert(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("알림 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchAlert();
  }, []);
  return (
    <>
      <div className="w-86 h-60 bg-white border border-gray-200 rounded-md ">
        <button>
          <MdClose onClick={onClose} className="absolute w-5 h-5 right-2 top-2 cursor-pointer" />
        </button>
        <div className="mx-4 my-2 ">
          {/* <p>{}hover:underline hover:underline-offset-3</p> */}
          <p className={alertList}>홍길동님이 좋아요를 눌렀습니다.</p>
          <p className={alertList}>KIAman님이 댓글을 달았습니다.</p>
          <p className={alertList}>KIAman님이 댓글을 달았습니다.</p>
          <p className={alertList}>KIAman님이 댓글을 달았습니다.</p>
        </div>
      </div>
    </>
  );
}
