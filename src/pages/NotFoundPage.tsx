import Image404 from "../assets/images/404.png";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center px-[16px] bg-[rgb(254,254,254)]">
        <main className="w-full flex flex-col justify-center items-center">
          <img src={Image404} alt="404 페이지 이미지" className="" />
          <p className="text-center text-[40px] font-extrabold text-[#474646] mb-[3px] mt-[19px]">
            죄송합니다 페이지를 찾을 수 없습니다
          </p>
          <p className="text-[#515151] text-[15px] font-medium mb-[75px]">
            존재하지 않은 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경,
            삭제되어 찾을 수 없습니다
          </p>
          <Link to={"/"}>
            <button className="border-b-[#474646] border-b-2 h-[120%] text-[16px] cursor-pointer font-medium">
              홈으로 가기
            </button>
          </Link>
        </main>
      </div>
    </>
  );
}
