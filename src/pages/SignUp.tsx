import Button from "../components/AuthButton";
import Input from "../components/AuthInput";
import BlueBoard from "../components/BlueBoard";
import AuthBoard from "../components/AuthBoard";
import Logo from "../components/Logo";

export default function SignUpPage() {
  return (
    <>
      <AuthBoard>
        <header>
          <Logo />
        </header>
        <main>
          <BlueBoard>
            <form className="w-full">
              <Input placeholder={"이메일"} type="email" />
              <Input placeholder={"이름"} />
              <Input placeholder={"비밀번호"} type="password" />
              <Input placeholder={"비밀번호 확인"} type="password" />
              <Button className="text-black bg-[#FF9500]">회원가입</Button>
            </form>
          </BlueBoard>
        </main>
      </AuthBoard>
    </>
  );
}
