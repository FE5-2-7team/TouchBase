import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

export default function UserMenu() {
  const token = useUserStore((state) => state.token);
  const logout = useUserStore((state) => state.logout);
  const getUser = useUserStore((state) => state.getUser);
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userId, setuserId] = useState("");

  console.log(setuserId);
  useEffect(() => {
    const user = getUser();
    if (user) {
      setuserId(user._id);
    }
    setIsLoggedin(!!token);
  }, [token]);

  return (
    <>
      <div className="w-22 h-27 bg-white border border-gray-200 rounded-md">
        <ul className="mx-2 text-center cursor-pointer">
          <li className="py-[3px] mt-1 border-b border-gray-200 cursor-pointer hover:underline hover:underline-offset-3">
            <Link to={`/profile/${userId}/posts`}>내 프로필</Link>
          </li>
          <li className="py-[3px] mt-1 border-b border-gray-200 cursor-pointer hover:underline hover:underline-offset-3">
            <Link to="/message">쪽지함</Link>
          </li>
          <li
            className="py-[3px] mt-1 mb-1 cursor-pointer hover:underline hover:underline-offset-3"
            onClick={() => {
              if (isLoggedin) {
                logout();
                navigate("/");
                window.location.reload();
              } else {
                navigate("/login");
              }
            }}
          >
            {isLoggedin ? "로그아웃" : "로그인"}
          </li>
        </ul>
      </div>
    </>
  );
}
