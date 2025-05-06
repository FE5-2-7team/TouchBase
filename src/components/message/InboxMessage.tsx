import { Link } from "react-router";
import Pagination from "./Pagination";
import { useState } from "react";
import EmptyMessage from "./EmptyMessage";
import { LuArrowDownWideNarrow } from "react-icons/lu";

export type MessageType = {
  userId: string;
  title: string;
  date: string;
};

export default function InboxMessage() {
  const [message, setMessage] = useState<MessageType[]>([
    {
      userId: "KIAman",
      title:
        "오늘 경기 굿굿! 이겨서 다행이네요 너무 즐거웠습니다~~~다음에 또 같이 가요 최강 기아 기아 짱짱맨 ",
      date: "25-04-28",
    },
    { userId: 2, title: "안녕하세요 ~ 주말 경기 같이 가요~~", date: "25-04-30" },
  ]);

  const sortHandler = () => {
    const sorted = [...message].sort((a, b) => {});
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="md:w-6/7 mb-[125px]">
          <h1 className="text-2xl font-bold mb-20 mt-20 text-center">받은쪽지함</h1>
          {message.length === 0 ? (
            <EmptyMessage message="받은쪽지가 없습니다." />
          ) : (
            <>
              <table className="w-full table-fixed">
                <thead className="border-t-1 border-b-1 border-gray-400 h-10">
                  <tr className="justify-between">
                    <th className="w-20 px-4 text-left text-[16px]">유저 아이디</th>
                    <th className="w-[300px] px-4 text-center text-[16px]">제목</th>
                    <th className="w-32 mb-1 text-right text-[16px]">
                      <div className="flex justify-end mr-5">
                        날짜
                        <button className="ml-2 cursor-pointer" onClick={() => sortHandler}>
                          <LuArrowDownWideNarrow />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {message.map((item) => (
                    <tr key={item.userId} className="first:mt-5">
                      <td className="py-2 px-6 ">{item.userId}</td>
                      <td className="py-2 px-10 whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer hover:font-bold">
                        <Link to={`/message/view/${item.userId}`}>{item.title}</Link>
                      </td>
                      <td className="w-32 py-2 px-4 text-right">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Pagination />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
