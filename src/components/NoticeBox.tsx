export default function NoticeBox() {
  const alertList = "border-b border-gray-200 py-1";
  return (
    <>
      <div className="w-86 h-60 bg-white border border-gray-200 rounded-md">
        <div className="mx-4 my-1">
          <p className={alertList}>홍길동님이 좋아요를 눌렀습니다.</p>
          <p className={alertList}>KIAman님이 댓글을 달았습니다.</p>
          <p className={alertList}>KIAman님이 댓글을 달았습니다.</p>
          <p className={alertList}>KIAman님이 댓글을 달았습니다.</p>
        </div>
      </div>
    </>
  );
}
