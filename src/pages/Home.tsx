import GameSchedule from "../components/GameSchedule";
import Ranking from "../components/Ranking";
import MainPostList from "../components/MainPostList";
import InfinityLogo from "../components/InfinityLogo";
// import Highlight from "../components/Highlight";

export default function MainContent() {
  return (
    <>
      <main className="container px-4 md:px-0 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4 my-10 lg:flex-row w-full">
            <GameSchedule />
            <Ranking />
          </div>
          <div className="w-full grid gap-10 md:gap-4 my-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1">
              <MainPostList title="인기글" />
            </div>
            <div className="col-span-1">
              <MainPostList title="최신글" />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <MainPostList title="주요 소식" listId="news" />
            </div>
          </div>
          <div className="w-full flex justify-center items-center highlight-wrapper min-h-[600px]">
            {/* <Highlight /> */}
          </div>
          <InfinityLogo />
        </div>
      </main>
    </>
  );
}
