import AuthButton from "./AuthButton";
import Button from "../FanPage/Button";
import Input from "./AuthInput";
import BlueBoard from "./BlueBoard";

export default function SignUp() {
  return (
    <>
      <main>
        <BlueBoard>
          <form className="w-full">
            <div className="w-full flex gap-[20px] mb-[35px] items-center">
              <Input
                placeholder={"이메일"}
                type="email"
                className="w-full max-w-[319px] mb-0"
              />
              <Button className="bg-[rgba(0,51,160,0.4)] rounded-[5px] text-[16px] hover:bg-[rgba(0,51,160,1)] hover:text-[#fff] transition">
                중복 확인
              </Button>
            </div>
            <div className="w-full flex gap-[20px] mb-[35px] items-center">
              <Input
                placeholder={"닉네임"}
                type="email"
                className="w-full max-w-[319px] mb-0"
                // onChange={}
              />
              <Button className="bg-[rgba(0,51,160,0.4)] rounded-[5px] text-[16px] hover:bg-[rgba(0,51,160,1)] hover:text-[#fff] transition">
                중복 확인
              </Button>
            </div>
            <Input
              placeholder={"비밀번호"}
              type="password"
              className="mb-[35px]"
            />
            <Input
              placeholder={"비밀번호 확인"}
              type="password"
              className="mb-[35px]"
            />
            <AuthButton className="text-black bg-[rgba(255,149,0,0.8)]">
              회원가입
            </AuthButton>
          </form>
        </BlueBoard>
      </main>
    </>
  );
}
