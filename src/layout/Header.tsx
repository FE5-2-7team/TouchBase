import { CgBell } from "react-icons/cg";
import { MdDarkMode, MdPerson, MdSearch } from "react-icons/md";
import logo from "../assets/images/로고.svg";
import KT from "../assets/images/team/kt.svg";
import LG from "../assets/images/team/lg.svg";
import NC from "../assets/images/team/nc.svg";
import SSG from "../assets/images/team/ssg.svg";
import KIWOOM from "../assets/images/team/kiwoom.svg";
import KIA from "../assets/images/team/kia.svg";
import LOTTE from "../assets/images/team/lotte.svg";
import DOOSAN from "../assets/images/team/doosan.svg";
import SAMSUNG from "../assets/images/team/samsung.svg";
import HANHWA from "../assets/images/team/hanwha.svg";

import { Link } from "react-router";

const TeamList = [
  { name: "KIA", img: KIA },
  { name: "삼성", img: SAMSUNG },
  { name: "LG", img: LG },
  { name: "두산", img: DOOSAN },
  { name: "KT", img: KT },
  { name: "SSG", img: SSG },
  { name: "롯데", img: LOTTE },
  { name: "한화", img: HANHWA },
  { name: "NC", img: NC },
  { name: "키움", img: KIWOOM },
];

const liItemStyle = "flex cursor-pointer";
const liImgStyle = "mr-3 h-7 w-7";
const iconDiv = "w-[30px] h-[30px] bg-white rounded-2xl mt-6";
const iconStyle = "w-5 h-5 ml-[5px] mt-1 text-[#002779] cursor-pointer";

export default function Header() {
  return (
    <header className="">
      <div className="z-50 bg-[#0033A0] w-full h-[80px]">
        <div className="flex justify-between mx-10">
          <Link to="/">
            <img src={logo} className="h-12 w-72 ml-40 mt-3 cursor-pointer" />
          </Link>
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
      <div className="w-full bg-[rgba(0,3,80,0.1)] h-[70px] top-[80px] border-b-1 border-gray-300">
        <ul className="flex gap-12 justify-center px-10 items-center h-full ">
          {TeamList.map((team) => (
            <li key={team.name} className={liItemStyle}>
              <Link to={`/fanpage/${team.name}`}>
                <img src={team.img} className={liImgStyle} alt={team.name} />
                {team.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
