import { useState, useEffect, useOptimistic } from "react";
import { BaseballGameData } from "../types/mainGame";
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
import MainTitle from "./MainTitle";

const API_URL = import.meta.env.VITE_API_NEXT_MATCH;
const TEAM_LIST = {
  KIA: KIA,
  삼성: SAMSUNG,
  LG: LG,
  두산: DOOSAN,
  KT: KT,
  SSG: SSG,
  롯데: LOTTE,
  한화: HANHWA,
  NC: NC,
  키움: KIWOOM,
};

const LoadingSkeleton = () => (
  <div className="w-auto border border-[#00000020]">
    <div className="flex flex-row justify-between py-4">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex items-center">
          <div className="w-[40px]">
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
        </div>
        <div className="flex items-center">
          <div className="w-[40px]">
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center px-8 border-l border-[#00000020]">
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
        </div>
        <div className="flex items-center px-8 border-l border-[#00000020]">
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function GameSchedule() {
  const [gameSchedule, setGameSchedule] = useState<BaseballGameData[]>([]);
  const [optimisticSchedule, addOptimisticSchedule] = useOptimistic(
    gameSchedule,
    (_, newSchedule: BaseballGameData[]) => newSchedule
  );

  const getGameSchedule = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch game schedule");
      }
      const data = await res.json();
      addOptimisticSchedule(data.game);
      setGameSchedule(data.game);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGameSchedule();
  }, []);

  return (
    <div className="w-full">
      <MainTitle title="경기 일정" color="#0033A0" />
      <div className="mt-10">
        {optimisticSchedule.length === 0
          ? Array(5)
              .fill(0)
              .map((_, index) => <LoadingSkeleton key={index} />)
          : optimisticSchedule.map((game) => (
              <div
                className="w-auto border border-[#00000020]"
                key={game.AWAY_NM}
              >
                <div className="flex flex-row justify-between py-4">
                  <div className="flex flex-col gap-4 px-4 w-1/2">
                    <div className="flex items-center">
                      <div className="w-[40px]">
                        <img
                          src={
                            TEAM_LIST[game.AWAY_NM as keyof typeof TEAM_LIST]
                          }
                          alt={game.AWAY_NM}
                          className="w-[30px]"
                        />
                      </div>
                      <span className="w-[60px]">{game.AWAY_NM}</span>
                      <span>{game.B_PIT_P_NM}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-[40px]">
                        <img
                          src={
                            TEAM_LIST[game.HOME_NM as keyof typeof TEAM_LIST]
                          }
                          alt={game.HOME_NM}
                          className="w-[30px]"
                        />
                      </div>
                      <span className="w-[60px]">{game.HOME_NM}</span>
                      <span>{game.T_PIT_P_NM}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex items-center px-8 border-l border-[#00000020]">
                      <span>{game.S_NM} 야구장</span>
                    </div>
                    <div className="flex items-center px-8 border-l border-[#00000020]">
                      <span>{game.G_TM}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
