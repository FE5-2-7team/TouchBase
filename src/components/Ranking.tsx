import MainTitle from "./MainTitle";
import { useState, useEffect, useOptimistic } from "react";
import { RankingData } from "../types/mainGame";

const API_URL = import.meta.env.VITE_API_TEAM_RANK;

const LoadingSkeleton = () => (
  <div className="grid grid-cols-9 gap-4 py-2.5 text-center items-center">
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
  </div>
);

export default function Ranking() {
  const [ranking, setRanking] = useState<RankingData[]>([]);
  const [updateDay, setUpdateDay] = useState("");

  const [optimisticRanking, addOptimisticRanking] = useOptimistic(
    ranking,
    (_, newRanking: RankingData[]) => newRanking
  );

  const fetchRanking = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch ranking");
      }
      const data = await res.json();
      setRanking(data.rows);
      addOptimisticRanking(data.rows);
      setUpdateDay(data.title);
    } catch (error) {
      console.error("Error fetching ranking:", error);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  const textContent = (text: string) => {
    const textArray = text.split("'>")[1];
    if (textArray) {
      return textArray.split("</span>")[0];
    } else return text;
  };

  return (
    <>
      <div className="w-full">
        <MainTitle title="경기 순위" color="#0033A0" />
        <div className="mt-10">
          <div className="border-1 border-[#00000020] w-full py-[10px]">
            <div className="grid grid-cols-9 gap-4 py-2 border-b border-[#000000] text-center">
              <span>순위</span>
              <span>팀명</span>
              <span>경기</span>
              <span>승</span>
              <span>패</span>
              <span>무</span>
              <span>승률</span>
              <span>게임차</span>
              <span>연속</span>
            </div>
            {optimisticRanking.length === 0
              ? Array(10)
                  .fill(0)
                  .map((_, index) => <LoadingSkeleton key={index} />)
              : optimisticRanking.map((item, i) => (
                  <div
                    className="grid grid-cols-9 gap-4 py-2.5 text-center items-center"
                    key={i}
                  >
                    {item.row.map((row) => (
                      <div>{textContent(row.Text)}</div>
                    ))}
                  </div>
                ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 text-end">{updateDay}</p>
      </div>
    </>
  );
}
