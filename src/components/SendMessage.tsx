export default function SendMessage() {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/5 mr-[250px]">
          <h1 className="text-2xl font-bold mb-8 mt-20 text-center mx-auto w-fit border-b-4 border-[#0033A0] pb-1">
            쪽지보내기
          </h1>
          <div className="w-full border border-gray-300">
            <div className="flex mt-2 border-b border-b-gray-300">
              <strong className="pr-10 ml-8 mt-2 text-[20px]">받으실 분</strong>
              <p className="px-6 pb-6 mt-2">userName</p>
            </div>
            <textarea className="w-full h-[380px] resize-none mt-10 px-6"></textarea>
            <div className="flex justify-end mb-6 mr-2 px-3">
              <button className=" justify-end bg-[#0033A0] text-white rounded-[10px] px-7 py-2 text-sm cursor-pointer">
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
