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
import axios from "axios";

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

const GameTable = ({ team, pitcher }: { team: string; pitcher: string }) => (
  <div className="flex items-center justify-around">
    <div className="flex items-center gap-2">
      <div className="w-[40px]">
        <img
          src={TEAM_LIST[team as keyof typeof TEAM_LIST]}
          alt={team}
          className="w-[30px]"
        />
      </div>
      <p className="w-[60px] font-bold">{team}</p>
    </div>
    <p className="w-20">
      <span className="text-[#00aeef] font-bold">선</span> {pitcher}
    </p>
  </div>
);

const LoadingSkeleton = () => (
  <div className="w-auto border border-[#00000020] dark:border-white">
    <div className="flex flex-row justify-between py-4">
      <div className="flex flex-col gap-4 px-4 w-full">
        <div className="flex items-center">
          <div className="w-[40px]">
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-500 w-6"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
        </div>
        <div className="flex items-center">
          <div className="w-[40px]">
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-500 w-6"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center px-8 border-l border-[#00000020] dark:border-white">
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-500 w-20"></div>
        </div>
        <div className="flex items-center px-8 border-l border-[#00000020] dark:border-white">
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-500 w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

const now = new Date();
// const today = new Date(now.getTime() + 9 * 60 * 60 * 1000); // KST 기준
const newDate = now;

const year = newDate.getFullYear();
const month = String(newDate.getMonth() + 1).padStart(2, "0");
const day = String(newDate.getDate()).padStart(2, "0");

export default function GameSchedule() {
  const [gameSchedule, setGameSchedule] = useState<BaseballGameData[]>([]);
  const [optimisticSchedule, addOptimisticSchedule] = useOptimistic(
    gameSchedule,
    (_, newSchedule: BaseballGameData[]) => newSchedule
  );

  const getGameSchedule = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.status === 200) {
        const data = res.data;
        addOptimisticSchedule(data.game);
        setGameSchedule(data.game);
      } else {
        console.error("Error fetching game schedule:", res.status);
      }
    } catch (error) {
      console.error("Error fetching game schedule:", error);
    }
  };

  const getGameScore = (team1: string, team2: string, team: string) => {
    let color;
    if (team1 === team2) {
      color = "text-[#222] dark:text-white";
    } else if (team === "1") {
      color = team1 > team2 ? "text-[#FF0000]" : "text-[#222] dark:text-white";
    } else {
      color = team1 < team2 ? "text-[#FF0000]" : "text-[#222] dark:text-white";
    }

    return color;
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
                className="w-auto border border-[#00000020] dark:border-white"
                key={game.AWAY_NM}
              >
                <div className="flex flex-row justify-between py-4">
                  <div className="flex flex-col gap-4 px-4 w-1/2">
                    <GameTable team={game.AWAY_NM} pitcher={game.T_PIT_P_NM} />
                    <GameTable team={game.HOME_NM} pitcher={game.B_PIT_P_NM} />
                  </div>
                  <div className="flex">
                    <div className="flex items-center justify-center px-8 border-l border-[#00000020] dark:border-white">
                      <div className="md:w-[100px]">
                        {game.GAME_INN_NO} {game.GAME_TB_SC_NM}
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <p
                          className={`text-md font-bold w-[10px] ${getGameScore(
                            game.T_SCORE_CN,
                            game.B_SCORE_CN,
                            "1"
                          )}`}
                        >
                          {game.T_SCORE_CN}
                        </p>
                        <p
                          className={`text-md font-bold w-[10px] ${getGameScore(
                            game.T_SCORE_CN,
                            game.B_SCORE_CN,
                            "2"
                          )}`}
                        >
                          {game.B_SCORE_CN}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center px-8 border-l border-[#00000020] dark:border-white md:w-[170px]">
                      <span>{game.S_NM} 야구장</span>
                    </div>
                    <div className="flex items-center px-8 border-l border-[#00000020] dark:border-white">
                      <span>{game.G_TM}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <p className="text-sm text-gray-500 text-end font-bold mt-1 dark:text-white">
        {year}년 {month}월 {day}일 기준
      </p>
    </div>
  );
}
