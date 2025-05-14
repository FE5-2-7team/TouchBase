import { useEffect, useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import { axiosInstance } from "../../api/axiosInstance";
import Swal from "sweetalert2";
import "animate.css";
import SearchThreads from "./SearchThreads";
import SearchUser from "./SearchUser";
import UserRecommend from "./UserRecommend";
import ThreadRecommends from "./ThreadRecommends";

export default function SearchBox({ onClose }: { onClose: () => void }) {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"user" | "thread">("user");

  const modalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const searchHandler = async () => {
    const trimkeyword = keyword?.toLowerCase().trim();

    if (!trimkeyword) {
      Swal.fire({
        title: "내용을 입력해주세요",
        icon: "warning",
        toast: true,
        position: "bottom",
        timer: 1500,
        showConfirmButton: false,
        showClass: {
          popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
        },
        hideClass: {
          popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
        },
      });
      return;
    }
    try {
      const res = await axiosInstance.get(`/search/all/${encodeURIComponent(trimkeyword)}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error("검색에 실패했습니다:", err);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (!keyword) {
      setSearchResults([]);
    }
  }, [keyword]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-xs z-60 flex items-center justify-center dark:bg-[#16171B]/90"
      onClick={onClose}
    >
      <div
        className={`bg-white md:w-[700px] sm:w-[500px] p-6 rounded-xl bottom-52.5 relative dark:bg-[#35363C]  ${
          searchResults ? "h-[600px] top-8" : "h-auto"
        }`}
        onClick={modalHandler}
      >
        <button className="absolute top-2 right-2 cursor-pointer">
          <MdClose
            className="w-5 h-5 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-gray-400"
            onClick={onClose}
          />
        </button>
        <div className="flex ml-2 my-2 ">
          <input
            type="text"
            placeholder="아이디 또는 게시글을 입력하세요"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchHandler();
              }
            }}
            value={keyword}
            className="searchInput w-[95%] p-3 pl-6 border border-gray-300 rounded-3xl placeholder: focus:outline-0 dark:border-gray-600 dark:text-gray-100"
          />
          <button type="button" className="cursor-pointer" onClick={searchHandler}>
            <MdSearch className=" mx-2 w-9 h-9 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-100" />
          </button>
        </div>
        <div className="flex justify-center mt-4 gap-3">
          <button
            className={`px-4 py-1.5 w-40 rounded-2xl text-sm ${
              activeTab === "user"
                ? "bg-[#0033A0] text-white dark:bg-[#235BD2] dark:text-gray-200"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setActiveTab("user")}
          >
            유저
          </button>
          <button
            className={`px-4 py-1.5 w-40 rounded-2xl text-sm ${
              activeTab === "thread"
                ? "bg-[#0033A0] text-white dark:bg-[#235BD2] dark:text-gray-200"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setActiveTab("thread")}
          >
            게시글
          </button>
        </div>

        {keyword.trim() === "" &&
          searchResults.length === 0 &&
          (activeTab === "user" ? (
            <UserRecommend onClose={onClose} />
          ) : (
            <ThreadRecommends onClose={onClose} />
          ))}

        {searchResults && (
          <>
            {activeTab === "user" ? (
              <div>
                <SearchUser keyword={keyword} results={searchResults} onClose={onClose} />
              </div>
            ) : (
              <div>
                <SearchThreads keyword={keyword} results={searchResults} onClose={onClose} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
