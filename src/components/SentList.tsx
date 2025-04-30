import Pagination from "./Pagination";

// import { useState } from "react";
export default function SentList() {
  const message = [
    {
      id: 1,
      title:
        "오늘 경기 굿굿! 이겨서 다행이네요 너무 즐거웠습니다~~~다음에 또 같이 가요 최강 기아 기아 짱짱맨 ",
      date: "25-04-28",
    },
    { id: 2, title: "안녕하세요 ~ 주말 경기 같이 가요~~", date: "25-04-30" },
  ];
  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/5 mr-[250px]">
          <h1 className="text-2xl font-bold mb-20 mt-22 text-center">보낸쪽지함</h1>
          <table className="w-full table-fixed">
            <thead className="border-t-1 border-b-1 border-gray-400 h-10">
              <tr className="items-center">
                <th className="w-10 px-4 text-left text-base font-normal">
                  <input type="checkbox" />
                </th>
                <th className="w-20 px-4 text-left">번호</th>
                <th className="w-[300px] px-4 text-left">제목</th>
                <th className="w-32 px-10 text-right">날짜</th>
              </tr>
            </thead>
            <tbody>
              {message.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-2 whitespace-nowrap text-ellipsis overflow-hidden">
                    {item.title}
                  </td>
                  <td className="w-32 py-2 px-4 text-right">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </>
  );
}
