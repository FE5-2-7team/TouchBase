import P_logo from "../assets/images/p_logo.svg";
import M_logo from "../assets/images/m_logo.png";

import { logos } from "../utils/getLogoImages";
import { Link } from "react-router";
import HeaderIcon from "../components/Header/HeaderIcon";

const liItemStyle = "justify-center cursor-pointer whitespace-nowrap ";
const liImgStyle = "mr-1 h-7 w-7 lg:mr-2";

export default function Header() {
  return (
    <header>
      <div className="z-30 fixed bg-[#0033A0] w-full h-[80px] dark:bg-[#16171B]">
        <div className="flex justify-between">
          <Link to="/">
            <img
              src={P_logo}
              alt="PC버전 로고"
              className="md:w-60 md:h-12 md:mt-3 md:ml-[120px] h-9 w-52 ml-6 mt-5 cursor-pointer hiddenHeader"
            />
            <img
              src={M_logo}
              alt="모바일버전 로고"
              className="mt-[6%] ml-4 h-10 w-fit m_logo"
            />
          </Link>
          <HeaderIcon />
        </div>
      </div>
      <div className="fixed z-10 w-full bg-[#f5f5f5] h-[80px] md:h-[70px] top-[80px] border-b border-gray-300 hiddenHeader dark:bg-[#202228] dark:text-white">
        <ul className="grid grid-cols-5 md:grid-cols-10 xl:gap-[1%] md:px-[8%] px-[2%] md:mt-5 mt-3 ">
          {logos.map((team) => (
            <li key={team.name} className={liItemStyle}>
              <Link
                to={`/fanpage/${team.name}`}
                className="flex items-center justify-center hover:text-[#ff9500] hover:underline hover:underline-offset-6 hover:decoration-2"
              >
                <img src={team.logo} className={liImgStyle} alt={team.name} />
                <p className="text-lg ">{team.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
