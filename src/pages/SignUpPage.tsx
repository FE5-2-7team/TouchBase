import Button from "../components/AuthButton";
import Input from "../components/AuthInput";
import InputBoard from "../components/InputBoard";

export default function SignUpPage() {
  return (
    <>
      <InputBoard>
        <Input placeholder={"이메일"} />
        <Input placeholder={"이름"} />
        <Input placeholder={"비밀번호"} />
        <Input placeholder={"비밀번호 확인"} />
        <Button className="text-black bg-[#FF9500]">회원가입</Button>
      </InputBoard>
    </>
  );
}
