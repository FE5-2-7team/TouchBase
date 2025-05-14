import AuthBoard from "../components/Auth/AuthBoard";
import Button from "../components/FanPage/Button";
import Image404 from "../assets/images/404.png";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      <AuthBoard>
        <main className="w-[390px] flex flex-col justify-center items-center">
          <div className="flex items-center w-full flex-col relative h-[150px]">
            <img
              src={Image404}
              alt="404 페이지 이미지"
              className="w-[242px] absolute top-[-167px]"
            />
            <h1 className="text-[150px] text-[#0033A0] font-black text-center leading-[150px] absolute z-[10] font-mono">
              404
            </h1>
          </div>
          <p className="text-center text-[16px] text-[#696969] mb-[70px] mt-[10px]">
            죄송합니다 페이지를 찾을 수 없습니다
            <br />
            존재하지 않은 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다
          </p>
          <Link to={"/"}>
            <Button className="w-[150px] h-[45px] rounded-[0] font-mono font-medium">
              홈으로 가기
            </Button>
          </Link>
        </main>
      </AuthBoard>
    </>
  );
}
