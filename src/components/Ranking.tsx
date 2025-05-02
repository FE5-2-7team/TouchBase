import MainTitle from "./MainTitle";

export default function Ranking() {
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
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div
                  className="grid grid-cols-9 gap-4 py-2.5 text-center items-center"
                  key={index}
                >
                  <div>{index + 1}</div>
                  <div>KT</div>
                  <div>10</div>
                  <div>10</div>
                  <div>10</div>
                  <div>10</div>
                  <div>10</div>
                  <div>10</div>
                  <div>10</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
