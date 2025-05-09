import { Link } from "react-router";
import Button from "./AuthButton";
import Input from "./AuthInput";
import BlueBoard from "./BlueBoard";

export default function LogIn() {
  return (
    <>
      <main>
        <BlueBoard>
          <form className="w-full">
            <Input placeholder={"이메일"} type="email" />
            <Input
              placeholder={"비밀번호"}
              type="password"
              className="mb-[0px]"
            />
            <div className="my-[35px] items-center justify-between flex">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="SaveId"
                  name="아이디 저장"
                  className="mr-[5px] w-[16px] h-[16px]"
                />
                <label
                  htmlFor="SaveId"
                  className="text-[14px] text-[#616161] font-medium"
                >
                  아이디 저장
                </label>
              </div>
            </div>
            <Button>로그인</Button>
          </form>
          <div className="border-b my-[18px] border-[#0033A0]"></div>
          <Button className="text-black bg-[#FF9500]">
            <Link to={"/signup"}>회원가입</Link>
          </Button>
        </BlueBoard>
      </main>
    </>
  );
}
