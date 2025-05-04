import { CgBell } from "react-icons/cg";
import { MdDarkMode, MdPerson, MdSearch } from "react-icons/md";
import P_logo from "../assets/images/p_logo.svg";
import M_logo from "../assets/images/m_logo.png";
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
import "../css/global.css";

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

const liItemStyle = "justify-center cursor-pointer whitespace-nowrap";
const liImgStyle = "mr-1 h-7 w-7 lg:mr-4";
const iconDiv = "w-[30px] h-[30px] bg-white rounded-2xl mt-6";
const iconStyle = "w-5 h-5 ml-[5px] mt-1 text-[#002779] cursor-pointer";

export default function Header() {
  return (
    <header>
      <div className="z-50 fixed bg-[#0033A0] w-full h-[80px]">
        <div className="flex justify-between">
          <Link to="/">
            <img
              src={P_logo}
              alt="PC버전 로고"
              className="md:w-60 md:h-12 md:mt-3 md:ml-[120px] h-9 w-52 ml-6 mt-5 cursor-pointer hiddenHeader"
            />
            <img src={M_logo} alt="모바일버전 로고" className="mt-[6%] ml-4 h-10 w-fit m_logo" />
          </Link>
          <div className="flex md:gap-2 gap-3 md:w-72 md:mx-5 mx-3 hiddenHeader">
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
      <div className="fixed w-full bg-[rgba(0,3,80,0.1)] h-[80px] md:h-[70px] top-[80px] border-b border-gray-300 hiddenHeader">
        <ul className="grid grid-cols-5 md:grid-cols-10 xl:gap-[2%] md:px-[8%] px-[2%] md:mt-5 mt-3 ">
          {TeamList.map((team) => (
            <li key={team.name} className={liItemStyle}>
              <Link to={`/fanpage/${team.name}`} className="flex items-center">
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
