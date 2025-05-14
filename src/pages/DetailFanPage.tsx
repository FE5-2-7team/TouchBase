import { useState, useEffect } from "react";
import Sidebar from "../components/FanPage/Sidebar";
import ThreadDetail from "../components/FanPage/ThreadDetail";
import { useParams, useSearchParams } from "react-router";

export default function DetailFanPage() {
  const { teamName } = useParams<{
    teamName: string;
    channelId: string;
    postId: string;
  }>();
  const typeTeamName = teamName as string;

  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState<string>("최신글");

  useEffect(() => {
    const isPopular = searchParams.get("sort") === "like";
    setTitle(isPopular ? "인기글" : "최신글");
  }, [teamName, searchParams]);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-[1500px] mx-auto">
        <Sidebar teamName={typeTeamName} title={title} setTitle={setTitle} />
        <div className="flex-1 px-2 md:mt-[0px] md:ml-[50px] md:mr-10 mt-[60px]">
          <div className="my-[30px] md:border-t md:border-[#d9d9d9] w-full"></div>
          <ThreadDetail />
        </div>
      </div>
    </>
  );
}
