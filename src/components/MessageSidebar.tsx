export default function MessageSidebar() {
  return (
    <>
      <div className="mt-20 cursor-pointer">
        <ul>
          <li className="text-center text-white text-2xl font-bold h-[73px] p-[15px] bg-[#0033A0]">
            받은 쪽지함
          </li>
          <li className="text-center text-black text-2xl font-bold h-[73px] p-[15px]">
            보낸 쪽지함
          </li>
          <li className="text-center text-black text-2xl font-bold h-[73px] p-[15px] ">
            쪽지 보내기
          </li>
        </ul>
      </div>
    </>
  );
}
