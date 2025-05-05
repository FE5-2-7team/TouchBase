import { Link } from "react-router";
export default function MessageSidebar() {
  const sidebarStyle =
    "text-center text-black text-2xl font-bold h-[73px] p-5 hover:bg-[#0033a0] hover:text-white active:bg-[#0033a0] active:text-white";
  return (
    <>
      <div className="mt-12.5 cursor-pointer">
        <ul>
          <Link to="/message/inbox">
            <li className={sidebarStyle}>받은 쪽지함</li>
          </Link>
          <Link to="/message/sent">
            <li className={sidebarStyle}>보낸 쪽지함</li>
          </Link>
          <Link to="/message/write">
            <li className={sidebarStyle}>쪽지 보내기</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
