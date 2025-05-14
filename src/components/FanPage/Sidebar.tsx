import {
  FaBaseball,
  FaRegClock,
  FaRegThumbsUp,
  FaYoutube,
} from "react-icons/fa6";
import { IoGift } from "react-icons/io5";
import { TbHandMove } from "react-icons/tb";
import { teamInfo } from "../../utils/getLogoImages";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
interface SidebarProps {
  teamName: string;
  title: string;
  setTitle: (title: string) => void;
}

export default function Sidebar({ teamName, title, setTitle }: SidebarProps) {
  const teams = teamInfo.find((team) => team.name === teamName)!;

  const nav = useNavigate();
  const { channelId } = useParams();

  useEffect(() => {
    setTitle("최신글");
  }, [teamName]);

  const navItems = [
    {
      icon: <FaBaseball />,
      title: "경기일정",
      href: "https://www.koreabaseball.com/",
    },
    {
      icon: title === "인기글" ? <FaRegClock /> : <FaRegThumbsUp />,
      title: title === "인기글" ? "최신글" : "인기글",
      href: null,
      onClick: () => {
        const isPopularNow = title === "인기글";
        setTitle(isPopularNow ? "최신글" : "인기글");
        nav(
          isPopularNow
            ? `/fanpage/${teamName}/${channelId}`
            : `/fanpage/${teamName}/${channelId}?sort=like`
        );
      },
    },
    { icon: <IoGift />, title: "구단 굿즈", href: "https://kbomarket.com/" },
    {
      icon: <FaYoutube />,
      title: "유튜브",
      href: teams.youtube,
    },
    {
      icon: <TbHandMove />,
      title: "홈페이지",
      href: teams.homepage,
    },
  ];

  return (
    <>
      <div
        className="md:sticky fixed md:top-[150px] top-[160px] left-0 z-5 w-full md:w-[240px] md:h-screen md:left-0
    border-b md:border-r md:border-b-0 border-[#d9d9d9] bg-[#fff] dark:bg-[#191A1E] "
      >
        {/* PC에서만 로고 보이게 */}
        <div className="md:flex hidden md:mt-[50px] md:mb-[40px] items-center justify-center">
          <img
            src={teams.logo}
            alt={`${teams.name}로고`}
            className="w-[70%] object-cover"
          />
        </div>

        <nav className="w-full md:mt-0">
          <ul className="flex md:flex-col flex-row justify-around gap-2 md:gap-8 md:text-[20px] font-bold py-4 text-[#343434] dark:text-[#fff]">
            {navItems.map((item, index) => {
              const isExternal =
                typeof item.href === "string" && item.href.startsWith("http");

              return (
                <li
                  key={index}
                  className="w-full md:w-[235px] h-[40px] md:h-[50px] flex justify-center"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="w-full h-full flex items-center justify-center px-1 md:px-6 hover:bg-[#0033A0] hover:text-white transition-all duration-200 whitespace-nowrap"
                    >
                      <div className="flex items-center justify-start gap-2 md:justify-start">
                        <span className="md:m-5">{item.icon}</span>
                        <span className="text-center md:text-left w-auto md:w-[100px]">
                          {item.title}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="w-full h-full flex items-center justify-center px-1 md:px-6 hover:bg-[#0033A0] hover:text-white transition-all duration-200 whitespace-nowrap"
                    >
                      <div className="flex items-center justify-start gap-2 md:justify-start">
                        <span className="md:m-5">{item.icon}</span>
                        <span className="text-center md:text-left w-auto md:w-[100px]">
                          {item.title}
                        </span>
                      </div>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
