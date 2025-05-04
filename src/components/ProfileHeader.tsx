import { NavLink, Outlet } from "react-router";
import profile from "../assets/images/bears.png";
import mascot from "../assets/images/doosan_mascot.png";

const USERNAME = "User name";
const POSTNUM = 10;
const FOLLOWERNUM = 200;
const FOLLOWINGNUM = 100;
const MESSAGENUM = 12;

export default function ProfileHeader() {
  return (
    <div className="flex flex-col gap-[34px] items-center pt-[200px]">
      <div className="border border-[#D9D9D9] shadow-md rounded-[10px] w-[968px] h-[200px] flex items-center justify-between p-[70px]">
        <img className="w-[123px] h-[123px]" src={profile} alt="my profile" />
        <div className="w-[480px]">
          <div className="text-[24px] font-bold">{USERNAME}</div>
          <div className="flex w-[465px] justify-between mt-[7px] mb-[14px]">
            <NavLink to="posts" style={({ isActive }) => ({ color: isActive ? "#FF9500" : "#0033A0" })}>
              <button className="flex items-center cursor-pointer">
                <span className="text-[20px] font-bold mr-[10px]">게시물</span>
                {POSTNUM}
              </button>
            </NavLink>
            <NavLink to="follower" style={({ isActive }) => ({ color: isActive ? "#FF9500" : "#0033A0" })}>
              <button className="flex items-center cursor-pointer">
                <span className="text-[20px] font-bold mr-[10px]">팔로워</span>
                {FOLLOWERNUM}
              </button>
            </NavLink>
            <NavLink to="following" style={({ isActive }) => ({ color: isActive ? "#FF9500" : "#0033A0" })}>
              <button className="flex items-center cursor-pointer">
                <span className="text-[20px] font-bold mr-[10px]">팔로잉</span>
                {FOLLOWINGNUM}
              </button>
            </NavLink>
            <NavLink to="message" style={({ isActive }) => ({ color: isActive ? "#FF9500" : "#0033A0" })}>
              <button className="flex items-center cursor-pointer">
                <span className="text-[20px] font-bold mr-[10px]">쪽지함</span>
                {MESSAGENUM}
              </button>
            </NavLink>
          </div>
          <button className="border rounded-[10px] py-[2px] px-[5px] text-[16px] text-[#6D6D6D] cursor-pointer">
            프로필 수정
          </button>
        </div>
        <img className="w-[100px] h-[158px] opacity-50" src={mascot} alt="철웅이" />
      </div>
      <Outlet></Outlet>
    </div>
  );
}
