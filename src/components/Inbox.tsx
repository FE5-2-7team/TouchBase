export default function Inbox() {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-6/7">
          <h1 className="text-2xl font-bold mb-8 mt-20 text-center mx-auto w-fit border-b-4 border-[#0033A0] pb-1">
            받은 쪽지
          </h1>
          <div className="w-full border border-gray-300">
            <div className="flex mt-2">
              <strong className="pr-10 ml-8 mt-3 text-[20px]">보내신 분</strong>
              <p className="px-6 pb-6 mt-2">userName</p>
            </div>
            <div className="flex border-b border-b-gray-300">
              <strong className="pr-10 ml-8 text-[20px]">받은 시간</strong>
              <p className="px-6 pb-6 ">2025-04-30 15:01</p>
            </div>
            <div className="w-full h-[380px] mt-10 px-10">메세지</div>
            <div className="flex justify-end mb-6 mr-2 px-3">
              <button className=" justify-end bg-[#0033A0] text-white rounded-[10px] px-7 py-2 text-sm cursor-pointer">
                답장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
