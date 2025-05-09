import { Link } from "react-router";
import { useState } from "react";

export default function UserMenu() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <>
      <div className="w-22 h-27 bg-white border border-gray-200 rounded-md">
        <ul className="mx-2 text-center cursor-pointer">
          <li className="py-[3px] mt-1 border-b border-gray-200 cursor-pointer hover:underline hover:underline-offset-3">
            <Link to="/profile:id/posts">내 프로필</Link>
          </li>
          <li className="py-[3px] mt-1 border-b border-gray-200 cursor-pointer hover:underline hover:underline-offset-3">
            <Link to="/message">쪽지함</Link>
          </li>
          <li className="py-[3px] mt-1 mb-1 cursor-pointer hover:underline hover:underline-offset-3">
            {isLoggedin ? "로그아웃" : <Link to="/login">로그인</Link>}
          </li>
        </ul>
      </div>
    </>
  );
}
