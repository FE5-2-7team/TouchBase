import { useState } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router";
import EmptyMessage from "./EmptyMessage";
import { MessageType } from "../../types/messageType";

//보낸메세지, 받은메세지함
export default function SentList({ userId, title, date }: MessageType) {
  const [message, setMessage] = useState([]);
  return (
    <>
      <div className="flex justify-center">
        <div className="md:w-6/7 mb-[125px]">
          <h1 className="text-2xl font-bold mb-20 mt-20 text-center">보낸쪽지함</h1>

          {message.length === 0 ? (
            <EmptyMessage message="보낸 쪽지가 없습니다." />
          ) : (
            <>
              <table className="w-full table-fixed">
                <thead className="border-t-1 border-b-1 border-gray-400 h-10">
                  <tr className="items-center">
                    <th className="w-20 px-4 text-left text-[16px]">유저 아이디</th>
                    <th className="w-[300px] px-4 text-center text-[16px]">제목</th>
                    <th className="w-32 px-10 text-right text-[16px]">날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {message.map((item) => (
                    <tr key={item.userId}>
                      <td className="py-2 px-6">{item.userId}</td>
                      <td className="py-2 px-10 whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                        <Link to={`/message/sent/${item.userId}`}>{item.title}</Link>
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
