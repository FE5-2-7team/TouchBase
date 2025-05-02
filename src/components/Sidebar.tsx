import { Link } from "react-router-dom";
import { FaBaseball } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";
import { IoGift } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { TbHandMove } from "react-icons/tb";

export default function Sidebar() {
  const navItems = [
    { icon: <FaBaseball />, title: "경기일정", href: "#" },
    { icon: <FaRegThumbsUp />, title: "인기글", to: "/popular" },
    { icon: <IoGift />, title: "구단 굿즈", href: "#" },
    {
      icon: <FaYoutube />,
      title: "유튜브",
      href: "https://www.youtube.com/channel/UCsebzRfMhwYfjeBIxNX1brg",
    },
    {
      icon: <TbHandMove />,
      title: "홈페이지",
      href: "https://www.doosanbears.com",
    },
  ];

  return (
    <div className="w-full md:w-[240px] md:h-full md:ml-[20px]">
      {/* PC 에서만 보여지는 부분 */}
      <div className="hidden md:block mt-[50px] mb-[40px]">
        <img
          src="https://www.doosanbears.com/_next/image?url=%2Fimages%2Fimg_logo_2025_1.jpg&w=384&q=75"
          alt="두산 베어스 로고"
          className="w-[235px] h-[145px] object-cover"
        />
      </div>

      <nav className="w-full mt-[10px] md:mt-0">
        <ul className="flex md:flex-col flex-row justify-around items-center gap-2 md:gap-8 md:text-[20px] font-bold py-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="w-full md:w-[240px] h-[40px] md:h-[50px] flex items-center justify-center"
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full flex items-center justify-center px-6 hover:bg-[#0033A0] hover:text-white transition-all duration-200"
                >
                  <span className="m-3">{item.icon}</span>
                  {item.title}
                </a>
              ) : item.to ? (
                <Link
                  to={item.to}
                  className="block w-full h-full flex items-center justify-center px-6 hover:bg-[#0033A0] hover:text-white transition-all duration-200"
                >
                  <span className="m-3">{item.icon}</span>
                  {item.title}
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
