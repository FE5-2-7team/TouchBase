import { useEffect, useState } from "react";
import { ExtendedUser } from "../../types/postType";
import { axiosInstance } from "../../api/axiosInstance";
import { FaUser } from "react-icons/fa";

export default function UserRecommend() {
  const [allUsers, setAllUsers] = useState<ExtendedUser[]>([]);
  const [recommneds, setRecommends] = useState<ExtendedUser[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/get-users");
        setAllUsers(res.data);

        const randomUser = [...res.data].sort(() => 0.5 - Math.random());
        setRecommends(randomUser.slice(0, 5));
        console.log(UserRecommend);
      } catch (err) {
        console.error("추천 유저 불러오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <h3 className="ml-4 text-lg text-[#2F6BEB]">추천 유저</h3>
      {recommneds.map((user) => (
        <div key={user._id} className="user-card flex my-4 ml-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.username}
              className="w-10 h-10 rounded-3xl border-1 border-gray-500"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-100 dark:white rounded-3xl border-1 border-gray-500">
              <FaUser className="w-6 h-6 m-1.5 dark:text-gray-600 text-[#2F6BEB]" />
            </div>
          )}
          <p className="mt-1.5 ml-4 cursor-pointer">
            {user.username ? user.username : user.fullName}
          </p>
        </div>
      ))}
      <p className="flex items-center justify-center mt-10 text-gray-400 dark:text-gray-500">
        검색어를 입력하세요.
      </p>
    </>
  );
}
