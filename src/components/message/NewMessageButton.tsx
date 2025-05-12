import { Link } from "react-router";
import { TbBrandTelegram } from "react-icons/tb";

export default function NewMessageButton() {
  const sidebarStyle =
    "text-center justify-center items-center text-black text-2xl font-bold flex h-[73px] hover:bg-[#0033a0] hover:text-white transition active:bg-[#0033a0] active:text-white dark:text-white dark:hover:bg-[#235BD2] ";
  return (
    <>
      <div className="mt-12.5 cursor-pointer">
        <Link to="/message/new">
          <div className={sidebarStyle}>
            <TbBrandTelegram className=" mr-4" /> 새 쪽지
          </div>
        </Link>
      </div>
    </>
  );
}
