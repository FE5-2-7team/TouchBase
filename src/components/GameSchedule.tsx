import KT from "../assets/images/team/kt.svg";
import LG from "../assets/images/team/lg.svg";
import MainTitle from "./MainTitle";

export default function GameSchedule() {
  return (
    <div className="w-full">
      <MainTitle title="경기 일정" color="#0033A0" />
      <div className="mt-10">
        {[0, 0, 0, 0, 0].map((_, index) => (
          <div className="w-auto border border-[#00000020]" key={index}>
            <div className="flex flex-row justify-between py-4">
              <div className="flex flex-col gap-4 px-4">
                <div className="flex items-center">
                  <div className="w-[40px]">
                    <img src={KT} alt="KT" className="w-[30px]" />
                  </div>
                  <span className="w-[60px]">KT</span>
                  <span>김동현</span>
                </div>
                <div className="flex items-center">
                  <div className="w-[40px]">
                    <img src={LG} alt="LG" className="w-[30px]" />
                  </div>
                  <span className="w-[60px]">두산</span>
                  <span>곽빈</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center px-8 border-l border-[#00000020]">
                  <span>잠실 야구장</span>
                </div>
                <div className="flex items-center px-8 border-l border-[#00000020]">
                  <span>오후 8:30</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
