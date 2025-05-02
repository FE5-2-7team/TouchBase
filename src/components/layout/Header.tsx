import { IoMdSearch } from "react-icons/io";
import { FaBell, FaMoon, FaUser } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import HeaderIcon from "../HeaderIcon";

const icons = [
  {
    key: 0,
    icon: <IoMdSearch className="text-[#002779]" />,
  },
  {
    key: 1,
    icon: <FaBell className="text-[#002779]" />,
  },
  {
    key: 2,
    icon: <FaMoon className="text-[#002779]" />,
  },
  {
    key: 3,
    icon: <FaUser className="text-[#002779]" />,
  },
];

export default function Header() {
  return (
    <>
      <header className="bg-[#0033A0]">
        <div className="container px-4 md:px-0 flex justify-between items-center mx-auto h-[80px] text-white">
          <div className="flex items-center">
            <span className="text-2xl font-bold">터치베이스</span>
          </div>
          <div className="items-center gap-2 hidden md:flex">
            {icons.map((icon) => (
              <HeaderIcon key={icon.key} icon={icon.icon} />
            ))}
          </div>
          <div className="md:hidden">
            <IoMenuSharp className="text-white cursor-pointer" />
          </div>
        </div>
      </header>
    </>
  );
}
