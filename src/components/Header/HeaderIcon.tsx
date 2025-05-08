import { useEffect, useRef, useState } from "react";

import { CgBell } from "react-icons/cg";
import { MdDarkMode, MdPerson, MdSearch, MdLightMode } from "react-icons/md";
import { useDarkMode } from "../../hooks/useDarkMode";

import UserMenu from "./UserMenu";
import NoticeBox from "./NoticeBox";
import SearchBox from "./SearchBox";

const iconDiv = "w-[30px] h-[30px] bg-white rounded-2xl mt-6 relative";
const iconStyle = "w-5 h-5 ml-[5px] mt-1 text-[#002779] cursor-pointer dark:text-[#16171B]";

export type Boxtype = "userMenu" | "notice" | "search" | null;

export default function HeaderIcon() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [activeBox, setActiveBox] = useState<Boxtype>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const toggleBox = (type: "userMenu" | "notice" | "search" | null) => {
    setActiveBox((prev) => (prev === type ? null : type));
  };

  useEffect(() => {
    const mouseDownHandler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setActiveBox(null);
      }
    };

    document.addEventListener("mousedown", mouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  return (
    <>
      <div className="flex md:gap-2 gap-3 md:w-72 md:mx-5 mx-3 hiddenHeader">
        <div className={iconDiv}>
          <MdSearch className={iconStyle} onClick={() => toggleBox("search")} />
          {activeBox === "search" && (
            <div className="absolute top-full z-[100]">
              {activeBox && <SearchBox onClose={() => toggleBox(null)} />}
            </div>
          )}
        </div>
        <div className={iconDiv}>
          <CgBell className={iconStyle} onClick={() => toggleBox("notice")} />
          {activeBox === "notice" && (
            <div ref={boxRef} className="absolute top-full -left-38 mt-2 z-[100] ">
              {activeBox && <NoticeBox onClose={() => toggleBox(null)} />}
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
          <MdPerson className={iconStyle} onClick={() => toggleBox("userMenu")} />
          {activeBox === "userMenu" && (
            <div ref={boxRef} className="absolute top-full -right-8 mt-2.5 z-[100]  ">
              {activeBox && <UserMenu />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
