import { NavLink, Outlet, useParams } from "react-router";
import mascot from "../assets/images/doosan_mascot.png";
import useGetUser from "../components/Profile/useGetUser";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { userStore } from "../stores/userStore";

export default function ProfileLayout() {
  const params = useParams();
  const { user, isLoading } = useGetUser(params.id!);
  const loginUserId = userStore((state) => state.getUser()?._id);

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
    <div className="flex flex-col gap-[34px] w-full max-w-[1200px] mx-auto mt-[40px]">
      <div className="border border-[#D9D9D9] shadow-md rounded-[10px] lg:h-[200px] md:h-[154px] sm:h-[120px] flex items-center gap-[50px] justify-between lg:px-[110px] px-[80px]">
        {user?.image ? (
          <img
            className="lg:w-[123px] lg:h-[123px] md:w-[100px] md:h-[100px] sm:w-[60px] sm:h-[60px]"
            src={user?.image}
            alt="my profile"
          />
        ) : (
          <FaUserCircle className="w-[100px] h-[100px] fill-[#2F6BEB] dark:fill-[#FFFFFF]" />
        )}

        <div className="">
          <div className="md:text-[24px] font-bold sm:text-[10px]">
            {user?.username ? user?.username : user?.fullName}
          </div>
          <div className="flex lg:w-[580px] md:w-[420px] sm:w-[240px] justify-between mt-[7px] md:mb-[14px] sm:mb-[5px]">
            <NavLink
              to="posts"
              className={({ isActive }) => (isActive ? "text-[#FF9500]" : "text-[#0033A0] dark:text-[#FFFFFF]")}
            >
              <button className="flex items-center cursor-pointer md:text-[16px] sm:text-[9px]">
                <span className="md:text-[20px] sm:text-[9px] font-bold md:mr-[10px] sm:mr-[6px]">게시물</span>
                {user?.posts.length}
              </button>
            </NavLink>
            <NavLink
              to="follower"
              className={({ isActive }) => (isActive ? "text-[#FF9500]" : "text-[#0033A0] dark:text-[#FFFFFF]")}
            >
              <button className="flex items-center cursor-pointer md:text-[16px] sm:text-[9px]">
                <span className="md:text-[20px] sm:text-[9px] font-bold md:mr-[10px] sm:mr-[6px]">팔로워</span>
                {user?.followers.length}
              </button>
            </NavLink>
            <NavLink
              to="following"
              className={({ isActive }) => (isActive ? "text-[#FF9500]" : "text-[#0033A0] dark:text-[#FFFFFF]")}
            >
              <button className="flex items-center cursor-pointer md:text-[16px] sm:text-[9px]">
                <span className="md:text-[20px] sm:text-[9px] font-bold md:mr-[10px] sm:mr-[6px]">팔로잉</span>
                {user?.following.length}
              </button>
            </NavLink>
            {params.id && loginUserId === params.id ? (
              <NavLink
                to="/message"
                className={({ isActive }) => (isActive ? "text-[#FF9500]" : "text-[#0033A0] dark:text-[#FFFFFF]")}
              >
                <button className="flex items-center cursor-pointer md:text-[16px] sm:text-[9px]">
                  <span className="md:text-[20px] sm:text-[9px] font-bold md:mr-[10px] sm:mr-[6px]">쪽지함</span>
                  {user?.messages.length}
                </button>
              </NavLink>
            ) : (
              ""
            )}
          </div>
          {params.id && loginUserId === params.id ? (
            <NavLink to="modify">
              {" "}
              <button className="border rounded-[10px] py-[3px] px-[10px] md:text-[16px] sm:text-[9px] text-[#6D6D6D] dark:text-[#FFFFFF] cursor-pointer">
                프로필 수정
              </button>
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <img
          className="lg:w-[100px] lg:h-[158px] md:w-[69px] md:h-[109px] opacity-50 md:block sm:hidden"
          src={mascot}
          alt="철웅이"
        />
      </div>
      <Outlet></Outlet>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-20 p-3 bg-blue-600 text-white rounded-[10px] shadow-lg hover:bg-blue-700 transition-all"
        >
          TOP
        </button>
      )}
    </div>
  );
}
