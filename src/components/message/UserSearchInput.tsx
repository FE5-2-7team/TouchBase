import { useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { BaseUser } from "../../types/postType";

type Props = {
  onSelect: (user: BaseUser) => void;
};
export default function UserSearchInput({ onSelect }: Props) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<BaseUser[]>([]);

  const searchInput = async () => {
    const res = await axiosInstance.get(`/search/users/${encodeURIComponent(keyword)}`);
    setResults(res.data);
  };
  return (
    <>
      <input
        type="text"
        placeholder="유저 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            searchInput();
          }
        }}
        className=" border p-3 border-gray-300 dark:border-gray-700 focus:ring-0 focus:outline-0"
      />

      <ul className="z-30 absolute w-50 h-auto bg-gray-100">
        {results.map((user) => {
          return (
            <li
              key={user._id}
              onClick={() => {
                setKeyword(user.fullName);
                setResults([]);
                onSelect(user);
              }}
              className="text-lg line-clamp-1 my-2 ml-3 cursor-pointer overflow-scroll"
            >
              {user.fullName}
            </li>
          );
        })}
      </ul>
    </>
  );
}
