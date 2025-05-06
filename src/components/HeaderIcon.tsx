import { CgBell } from "react-icons/cg";
import { MdDarkMode, MdPerson, MdSearch, MdLightMode } from "react-icons/md";
import { useDarkMode } from "../hooks/useDarkMode";
import UserMenu from "./UserMenu";
import { useState } from "react";
import NoticeBox from "./NoticeBox";

const iconDiv = "w-[30px] h-[30px] bg-white rounded-2xl mt-6 relative";
const iconStyle = "w-5 h-5 ml-[5px] mt-1 text-[#002779] cursor-pointer";
export default function HeaderIcon() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNoticeOpen, setNoticeOpen] = useState(false);

  const toggleUserMenu = () => {
    setMenuOpen((prev) => !prev);
    setNoticeOpen(false);
  };
  const toggleNoticeBox = () => {
    setNoticeOpen((prev) => !prev);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="flex md:gap-2 gap-3 md:w-72 md:mx-5 mx-3 hiddenHeader">
        <div className={iconDiv}>
          <MdSearch className={iconStyle} />
        </div>
        <div className={iconDiv}>
          <CgBell className={iconStyle} onClick={toggleNoticeBox} />
          {isNoticeOpen && (
            <div className="absolute top-full -left-38 mt-2 z-[100] ">
              <NoticeBox />
            </div>
          )}
        </div>
        <div className={iconDiv}>
          {isDark ? (
            <MdLightMode className={iconStyle} onClick={toggleDarkMode} />
          ) : (
            <MdDarkMode className={iconStyle} onClick={toggleDarkMode} />
          )}
        </div>

        <div className={iconDiv}>
          <MdPerson className={iconStyle} onClick={toggleUserMenu} />
          {isMenuOpen && (
            <div className="absolute top-full -right-8 mt-2 z-[100] ">
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
