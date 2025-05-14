import M_logo from "../assets/images/m_logo.png";
import tb_w_logo from "../assets/images/tb_w_logo.svg";

import { logos } from "../utils/getLogoImages";
import { Link } from "react-router";
import HeaderIcon from "../components/Header/HeaderIcon";
import { axiosInstance } from "../api/axiosInstance";
import { useEffect, useState } from "react";

const liItemStyle = "justify-center cursor-pointer whitespace-nowrap ";
const liImgStyle = "mr-1 h-7 w-7 lg:mr-2";

type Channel = {
  _id: string;
  name: string;
};

export default function Header() {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const teamList = async () => {
      try {
        const res = await axiosInstance.get("/channels");
        const data: Channel[] = res.data;
        setChannels(data);
      } catch (err) {
        console.error("호출에 실패했습니다.", err);
      }
    };

    teamList();
  }, []);
  return (
    <header>
      <div className="z-70 fixed bg-[#0033A0] w-full h-[80px] dark:bg-[#16171B]">
        <div className="flex justify-between">
          <Link to="/">
            <img
              src={tb_w_logo}
              alt="PC버전 로고"
              className="md:w-60 md:h-12 md:mt-3 md:ml-[120px] h-9 w-52 ml-6 mt-6 cursor-pointer hiddenHeader"
            />
            <img src={M_logo} alt="모바일버전 로고" className="mt-[6%] ml-4 h-10 w-fit m_logo" />
          </Link>
          <HeaderIcon />
        </div>
      </div>
      <div className="fixed z-60 w-full bg-[#f5f5f5] h-[80px] md:h-[70px] top-[80px] border-b border-gray-200 dark:border-0 hiddenHeader dark:bg-[#202228] dark:text-white">
        <ul className="grid grid-cols-5 md:grid-cols-10 xl:gap-[1%] md:px-[8%] px-[2%] md:mt-5 mt-3 ">
          {channels.map((channel) => {
            const logoList = logos.find((logo) => logo.name === channel.name);
            return (
              <li key={channel._id} className={liItemStyle}>
                <Link
                  to={`/fanpage/${channel.name}/${channel._id}`}
                  className="flex items-center justify-center hover:text-[#ff9500] hover:underline hover:underline-offset-6 hover:decoration-2"
                >
                  {logoList && <img src={logoList.logo} className={liImgStyle} alt={channel._id} />}
                  <p className="text-lg ">{channel.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
