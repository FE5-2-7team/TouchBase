import { CgBell } from "react-icons/cg";
import { MdDarkMode, MdPerson, MdSearch } from "react-icons/md";

const TeamList = [
  { name: "KIA", img: "/public/KIA.png" },
  { name: "삼성", img: "/public/Samsung.png" },
  { name: "LG", img: "/public/LG.png" },
  { name: "두산", img: "/public/두산.png" },
  { name: "KT", img: "/public/KT.png" },
  { name: "SSG", img: "/public/SSG.png" },
  { name: "롯데", img: "/public/롯데.png" },
  { name: "한화", img: "/public/한화.png" },
  { name: "NC", img: "/public/NC.png" },
  { name: "키움", img: "/public/키움.png" },
];

const liItemStyle = "flex cursor-pointer";
const liImgStyle = "mr-3 h-7 w-7";
const iconDiv = "w-[30px] h-[30px] bg-white rounded-2xl mt-6";
const iconStyle = "w-5 h-5 ml-[5px] mt-1";

export default function Header() {
  return (
    <>
      <div className="z-50 fixed bg-[#0033A0] w-full h-[80px]">
        <div className="flex justify-between mx-10">
          <img src="/public/로고.svg" className="h-12 w-72 ml-40 mt-3" />
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
