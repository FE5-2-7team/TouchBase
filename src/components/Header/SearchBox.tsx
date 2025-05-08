import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { MdSearch, MdClose } from "react-icons/md";
import { ExtendedUser } from "../../types/postType";
import Swal from "sweetalert2";
import "animate.css";
import { FaUser } from "react-icons/fa";
import SearchThreads from "./SearchThreads";

export default function SearchBox({ onClose }: { onClose: () => void }) {
  const [keyword, setKeyword] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [users, setUsers] = useState<ExtendedUser[]>([]);
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
      const res = await axiosInstance.get(`/search/all/${encodeURIComponent(keyword)}`);
      const data = res.data;

      const result = data.filter((user: any) => {
        const username = (user.username ?? "").toLowerCase().trim() || "";
        const fullName = (user.fullName ?? "").toLowerCase().trim() || "";

        return username.includes(trimkeyword) || fullName.includes(trimkeyword);
      });
      console.log(result);
      setHasResult(result.length > 0);
      setUsers(result);
      setHasResult(true);
    } catch (err) {
      console.error("검색에 실패했습니다.", err);
    }
  };

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axiosInstance.get("/users/get-users");
        setUsers(res.data);
      } catch (err) {
        console.log("정보 불러오기 실패", err);
      }
    };

    userData();
  }, []);

  useEffect(() => {
    if (!keyword) {
      setHasResult(false);
      setUsers([]);
    }
  }, [keyword]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center dark:bg-[#16171B]/90"
      onClick={onClose}
    >
      <div
        className={`bg-white w-[700px] p-6 rounded-xl bottom-52.5 relative dark:bg-[#35363C] ${
          hasResult ? "h-[600px] top-8" : "h-auto"
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
            className="searchInput w-[95%] p-3 pl-6 border border-gray-300 rounded placeholder: focus:outline-0 dark:border-gray-600 dark:text-gray-100"
          />
          <button type="button" className="cursor-pointer" onClick={searchHandler}>
            <MdSearch className=" mx-2 w-9 h-9 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-100" />
          </button>
        </div>
        {hasResult && (
          <>
            <div
              className={`dark:text-white block p-1 pb-4 ${
                users.length > 0 ? "border-b border-b-gray-400" : ""
              } `}
            >
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id} className="user-card flex my-4">
                    {user.image ? (
                      <img src={user.image} alt={user.username} className="w-10 h-10 rounded-3xl" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 dark:white rounded-3xl">
                        <FaUser className="w-6 h-6 m-2 dark:text-gray-600 text-[#2F6BEB]" />
                      </div>
                    )}
                    <p className="mt-1.5 ml-4">{user.username}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500 mt-10 border-b border-b-gray-400 pb-20">
                  일치하는 내용이 없습니다.
                </div>
              )}
            </div>
            <div>
              <div>
                <SearchThreads keyword={keyword} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
