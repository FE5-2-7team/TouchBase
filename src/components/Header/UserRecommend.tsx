import { useEffect, useState } from "react";
import { ExtendedUser } from "../../types/postType";
import { axiosInstance } from "../../api/axiosInstance";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
interface Props {
  onClose: () => void;
}
export default function UserRecommend({ onClose }: Props) {
  const [allUsers, setAllUsers] = useState<ExtendedUser[]>([]);
  const [recommneds, setRecommends] = useState<ExtendedUser[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/get-users");
        setAllUsers(res.data);

        const randomUser = [...res.data].sort(() => 0.5 - Math.random());
        setRecommends(randomUser.slice(0, 10));
        console.log(UserRecommend);
      } catch (err) {
        console.error("추천 유저 불러오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <h3 className="ml-5 text-sm text-[#2F6BEB] dark:text-gray-400">추천 유저</h3>
      {recommneds.map((user) => (
        <div
          key={user._id}
          className="user-card flex my-2 mx-6"
          onClick={() => {
            onClose();
          }}
        >
          {user.image ? (
            <img src={user.image} alt={user.username} className="w-8 h-8 mr-3 mt-2 rounded-3xl" />
          ) : (
            <div className="w-8 h-8 mt-1 mr-3 bg-gray-200 dark:white rounded-3xl ">
              <FaUser className="w-4 h-4 ml-2 items-center justify-center mt-2 dark:text-gray-600 text-[#2F6BEB]" />
            </div>
          )}
          <Link
            to={`/profile/${user._id}`}
            className="mt-2.5 text-sm cursor-pointer whitespace-nowrap dark:text-white"
          >
            {user.username ? user.username : user.fullName}
          </Link>
        </div>
      ))}
    </>
  );
}
