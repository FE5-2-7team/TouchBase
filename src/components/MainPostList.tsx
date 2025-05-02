import KT from "../assets/images/team/kt.svg";
import MainTitle from "./MainTitle";

export default function MainPostList({
  title,
  listId = "post",
}: {
  title: string;
  listId?: string;
}) {
  return (
    <div className="w-full md:mb-10">
      <MainTitle title={title} color="#FF9500" />
      {listId === "post" && (
        <div className="flex flex-col gap-4 mt-10 w-full">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div className="flex flex-row gap-4" key={index}>
                <>
                  <div key={index}>
                    <img src={KT} alt="KT" className="w-[30px]" />
                  </div>
                  <div>KT</div>
                </>
                <div>구장에서 커플 싸움 직관한 썰 푼다</div>
              </div>
            ))}
        </div>
      )}
      {listId === "news" && (
        <div className="flex flex-col gap-4 mt-10 w-full md:text-[15px] text-[28px]">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex flex-row gap-4">
                <div className="mb-5">
                  레예스 복귀전 승리 &디아즈 멀티 홈런 폭발…삼성, 5연승 질주
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
