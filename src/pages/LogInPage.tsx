import InputBoard from "../components/InputBoard";
import Button from "../components/AuthButton";
import Input from "../components/AuthInput";

export default function LoginPage() {
  return (
    <>
      <InputBoard>
        <form className="w-full flex flex-col">
          <Input placeholder="이메일" />
          <Input placeholder="비밀번호" className="mb-[0px]" />
          <div className="my-[35px] w-full items-center justify-between flex">
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
            <p className="text-[14px] text-[#616161] cursor-pointer">
              비밀번호 찾기
            </p>
          </div>
          <Button>로그인</Button>
        </form>
        <div className="border-b my-[18px] border-[#0033A0]"></div>
        <Button className="text-black bg-[#FF9500]">회원가입</Button>
      </InputBoard>
    </>
  );
}
