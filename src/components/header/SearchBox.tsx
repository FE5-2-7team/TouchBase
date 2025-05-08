import { useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import "animate.css";

export default function SearchBox({ onClose }: { onClose: () => void }) {
  const [keyword, setKeyword] = useState("");
  const modalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimkeyword = keyword?.trim();

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
      const res = await fetch("http://13.125.208.179:5011/users/get-users");
      const data = await res.json();

      const result = data.filter((user: any) => {
        const username = (user.username ?? "").toLowerCase().trim() || "";
        const fullName = (user.fullName ?? "").toLowerCase().trim() || "";

        return username.includes(trimkeyword) || fullName.includes(trimkeyword);
      });
      console.log(result);
    } catch (err) {
      console.error("검색에 실패했습니다.", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center dark:bg-[#16171B]/90"
      onClick={onClose}
    >
      <div
        className="bg-white w-[700px] h-auto p-6 rounded-xl bottom-55 relative dark:bg-[#35363C]"
        onClick={modalHandler}
      >
        <button className="absolute top-2 right-2 cursor-pointer">
          <MdClose
            className="w-5 h-5 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-gray-400"
            onClick={onClose}
          />
        </button>
        <form className="flex ml-2 my-3" onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="아이디 또는 게시글을 입력하세요"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className="searchInput w-[95%] p-3 pl-6 border border-gray-300 rounded placeholder: focus:outline-0 dark:border-gray-600 dark:text-gray-100"
          />
          <button type="submit" className="cursor-pointer">
            <MdSearch className=" mx-2 w-9 h-9 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-100" />
          </button>
        </form>
      </div>
    </div>
  );
}
