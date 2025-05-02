import { CgBell } from "react-icons/cg";
import { MdDarkMode, MdPerson, MdSearch } from "react-icons/md";

const TeamList = [
  { name: "KIA", img: "/src/assets/images/team/kia.svg" },
  { name: "삼성", img: "/src/assets/images/team/samsung.svg" },
  { name: "LG", img: "/src/assets/images/team/lg.svg" },
  { name: "두산", img: "/src/assets/images/team/doosan.svg" },
  { name: "KT", img: "/src/assets/images/team/kt.svg" },
  { name: "SSG", img: "/src/assets/images/team/ssg.svg" },
  { name: "롯데", img: "/src/assets/images/team/lotte.svg" },
  { name: "한화", img: "/src/assets/images/team/hanwha.svg" },
  { name: "NC", img: "/src/assets/images/team/nc.svg" },
  { name: "키움", img: "/src/assets/images/team/kiwoom.svg" },
];

const liItemStyle = "flex cursor-pointer";
const liImgStyle = "mr-3 h-7 w-7";
const iconDiv = "w-[30px] h-[30px] bg-white rounded-2xl mt-6";
const iconStyle = "w-5 h-5 ml-[5px] mt-1 text-[#002779] cursor-pointer";

export default function Header() {
  return (
    <>
      <div className="z-50 fixed bg-[#0033A0] w-full h-[80px]">
        <div className="flex justify-between mx-10">
          <img src="/src/assets/images/로고.svg" className="h-12 w-72 ml-40 mt-3 cursor-pointer" />
          <div className="flex mr-40 gap-4">
            <div className={iconDiv}>
              <MdSearch className={iconStyle} />
            </div>
            <div className={iconDiv}>
              <CgBell className={iconStyle} />
            </div>
            <div className={iconDiv}>
              <MdDarkMode className={iconStyle} />
            </div>
            <div className={iconDiv}>
              <MdPerson className={iconStyle} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed w-full bg-[rgba(0,3,80,0.1)] h-[70px] top-[80px] border-b-1 border-gray-300">
        <ul className="flex gap-12 justify-center px-10 items-center h-full ">
          {TeamList.map((team) => (
            <li key={team.name} className={liItemStyle}>
              <img src={team.img} className={liImgStyle} alt={team.name} />
              {team.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
