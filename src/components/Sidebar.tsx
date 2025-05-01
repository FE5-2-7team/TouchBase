import { Link } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { icon: "", title: "경기일정", to: "/schedule" },
    { icon: "", title: "인기글", to: "/popular" },
    { icon: "", title: "구단 굿즈", to: "/goods" },
    {
      icon: "",
      title: "유튜브",
      href: "https://www.youtube.com/channel/UCsebzRfMhwYfjeBIxNX1brg",
    },
    { icon: "", title: "홈페이지", href: "https://www.doosanbears.com" },
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
              className="w-full md:w-[240px] h-[40px] md:h-[50px] flex items-center justify-center text-center"
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full flex items-center justify-center hover:bg-[#0033A0] hover:text-white transition-all duration-200"
                >
                  <span className="material-icons">{item.icon}</span>
                  {item.title}
                </a>
              ) : item.to ? (
                <Link
                  to={item.to}
                  className="block w-full h-full flex items-center justify-center hover:bg-[#0033A0] hover:text-white transition-all duration-200"
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
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
