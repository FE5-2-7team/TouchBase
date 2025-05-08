import { Link } from "react-router";
import { TbMail, TbBrandTelegram, TbMailUp } from "react-icons/tb";

export default function MessageSidebar() {
  const sidebarStyle =
    "text-center justify-center items-center text-black text-2xl font-bold flex h-[73px] hover:bg-[#0033a0] hover:text-white transition active:bg-[#0033a0] active:text-white dark:text-white dark:hover:bg-[#235BD2] ";
  return (
    <>
      <div className="mt-12.5 cursor-pointer">
        <ul>
          <Link to="/message/inbox">
            <li className={sidebarStyle}>
              <TbMail className="mr-4" />
              받은 쪽지함
            </li>
          </Link>
          <Link to="/message/sent">
            <li className={sidebarStyle}>
              <TbMailUp className="mr-4" />
              보낸 쪽지함
            </li>
          </Link>
          <Link to="/message/write">
            <li className={sidebarStyle}>
              <TbBrandTelegram className=" mr-4" />
              쪽지 보내기
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
