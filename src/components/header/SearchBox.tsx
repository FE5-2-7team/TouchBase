import { MdSearch, MdClose } from "react-icons/md";

export default function SearchBox({ onClose }: { onClose: () => void }) {
  const modalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <div className="flex ml-2 my-3">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-[95%] p-3 pl-6 border border-gray-300 rounded placeholder: focus:outline-0 dark:border-gray-600 dark:text-gray-100"
          />
          <button className="cursor-pointer">
            <MdSearch className=" mt-0.5 mx-2 w-9 h-9 text-gray-300 hover:text-[#00aeef] dark:text-gray-400 dark:hover:text-gray-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
