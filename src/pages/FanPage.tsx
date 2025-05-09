import { useState, useEffect } from "react";
import Upload from "../components/FanPage/Upload";
import Sidebar from "../components/FanPage/Sidebar";
import ThreadsList from "./../components/FanPage/ThreadsList";
import { useParams } from "react-router";

export default function FanPage() {
  const { teamName } = useParams<{ teamName: string }>();
  const typeTeamName = teamName as string;

  // top 버튼 보일지 말지
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 최상단으로 스크롤 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-[1500px] mx-auto">
        <Sidebar teamName={typeTeamName} />
        <div className="flex-1 px-2 md:mt-[80px] md:ml-[50px] md:mr-10 mt-[100px]">
          <Upload />
          <div className="my-[50px] border-t border-[#d9d9d9] w-full"></div>
          <ThreadsList />
          <div className="m-[30px]"></div>
        </div>
      </div>

      {/* top버튼 */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-20 p-3 bg-blue-600 text-white rounded-[10px] shadow-lg hover:bg-blue-700 transition-all"
        >
          TOP
        </button>
      )}
    </>
  );
}
