import { FaBaseball } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";
import { IoGift } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { TbHandMove } from "react-icons/tb";

export default function Sidebar() {
  const navItems = [
    { icon: <FaBaseball />, title: "경기일정", href: "#" },
    { icon: <FaRegThumbsUp />, title: "인기글", href: "/popular" },
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
    <>
      <div
        className="md:sticky fixed top-[150px] left-0 z-40 w-full md:w-[240px] md:h-screen md:left-0
    border-b md:border-r md:border-b-0 border-[#d9d9d9] bg-white"
      >
        {/* PC에서만 로고 보이게 */}
        <div className="hidden md:block md:mt-[50px] md:mb-[40px]">
          <img
            src="https://www.doosanbears.com/_next/image?url=%2Fimages%2Fimg_logo_2025_1.jpg&w=384&q=75"
            alt="두산 베어스 로고"
            className="w-[235px] h-[145px] object-cover"
          />
        </div>

        <nav className="w-full md:mt-0">
          <ul className="flex md:flex-col flex-row justify-around gap-2 md:gap-8 md:text-[20px] font-bold py-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="w-full md:w-[240px] h-[40px] md:h-[50px] flex justify-center"
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-full h-full flex items-center justify-center px-1 md:px-6 hover:bg-[#0033A0] hover:text-white transition-all duration-200 whitespace-nowrap"
                >
                  <div className="flex items-center justify-start gap-2 md:justify-start">
                    <span className="md:m-5">{item.icon}</span>
                    <span className="text-center md:text-left w-auto md:w-[100px]">
                      {item.title}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
