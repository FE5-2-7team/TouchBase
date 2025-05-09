import AuthButton from "./AuthButton";
import Button from "../FanPage/Button";
import Input from "./AuthInput";
import BlueBoard from "./BlueBoard";
import { useState } from "react";
import { BaseUser } from "../../types/postType.ts";
import { axiosInstance } from "../../api/axiosInstance.ts";
import { useNavigate } from "react-router";
import Message from "./Message.tsx";

export default function SignUp() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [nickNameValid, setNickNameValid] = useState(true);
  const [nickNameChangeValid, setNickNameChangeValid] = useState(true);
  const [emailVaild, setEmailVaild] = useState(true);
  const [passwordVaild, setPasswordVaild] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState(true);

  const submitValid = [
    nickName,
    email,
    password,
    checkPassword,
    nickNameChangeValid,
    emailVaild,
    passwordVaild,
    passwordCheck,
  ];

  //닉네임 유효성 검사
  function nickNameValidCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const isValid = /^[a-z0-9가-힣]+$/.test(e.target.value);
    setNickNameValid(true);
    setNickName(e.target.value);
    setNickNameChangeValid(isValid);
  }

  //이메일 유효성 검사
  function emailValidCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValid = emailRegex.test(e.target.value);
    setEmail(e.target.value);
    setEmailVaild(isValid);
  }

  //비밀번호 유효성 검사
  function passwordValidCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/;
    const isValid = passwordRegex.test(e.target.value);
    setPassword(e.target.value);
    setPasswordVaild(isValid);
  }

  //비밀번호 비교 검사
  function passwordChecking(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckPassword(e.target.value);
    setPasswordCheck(e.target.value === password);
  }

  //비밀번호 체크 인풋에 포커스 들어갈 때
  function retestFocusIn() {
    if (checkPassword === password) {
      setPasswordCheck(true);
      return;
    }
    setPasswordCheck(false);
  }

  //닉네임 유효성 검사
  async function validNickName() {
    if (nickName === "" || !nickNameChangeValid) return;

    try {
      const response = await fetch(`${baseUrl}users/get-users`);
      const json = await response.json();
      const result = json.some((el: BaseUser) => el.fullName === nickName);
      if (result) {
        setNickNameValid(true);
      } else {
        setNickNameValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function submitSignUpData() {
    if (submitValid.some((vaild) => vaild == false)) {
      alert("닉네임 혹은 이메일, 비밀번호가 유효하지 않습니다");
      return;
    }

    let response;

    try {
      response = await axiosInstance.post(`/signup`, {
        email: email.toLocaleLowerCase(),
        fullName: nickName.toLocaleLowerCase(),
        password: password.toLocaleLowerCase(),
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setNickNameValid(true);
      setNickName("");
      setEmail("");
      setPassword("");
      setCheckPassword("");
      navigate("/");
    }
  }

  return (
    <>
      <main>
        <BlueBoard>
          <form className="w-full">
            <div className="w-full flex gap-[20px] mb-[35px] items-center relative">
              <Input
                placeholder={"닉네임"}
                type="text"
                className="w-full mb-[0]"
                setFc={setNickNameValid}
                onChange={(e) => nickNameValidCheck(e)}
                value={nickName}
              />
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  validNickName();
                }}
                className="bg-[rgba(0,51,160,0.4)] rounded-[5px] text-[16px] hover:bg-[rgba(0,51,160,1)] hover:text-[#fff] transition"
              >
                중복 확인
              </Button>
              {!nickNameChangeValid && (
                <Message>사용 할 수 없는 닉네임 입니다</Message>
              )}
              {!nickNameValid && (
                <Message className="text-green-500">
                  사용 가능한 닉네임 입니다
                </Message>
              )}
            </div>
            <div className="w-full flex gap-[20px] mb-[35px] items-center relative">
              <Input
                placeholder={"이메일"}
                type="email"
                className="w-full mb-[0]"
                value={email}
                setFc={setEmailVaild}
                onChange={(e) => {
                  emailValidCheck(e);
                }}
              />
              {!emailVaild && (
                <Message>이메일 형식이 올바르지 않습니다</Message>
              )}
            </div>
            <div className="relative mb-[35px]">
              <Input
                placeholder={"비밀번호"}
                type="password"
                className="mb-[0]"
                value={password}
                setFc={setPasswordVaild}
                onChange={passwordValidCheck}
              />
              {!passwordVaild && (
                <Message>8~16자, 영문, 숫자 조합 입니다</Message>
              )}
            </div>
            <div className="relative mb-[35px]">
              <Input
                onFocus={retestFocusIn}
                onChange={passwordChecking}
                setFc={setPasswordCheck}
                value={checkPassword}
                placeholder={"비밀번호 확인"}
                type="password"
                className="mb-[35px]"
              />
              {!passwordCheck && (
                <Message>비밀번호가 일치하지 않습니다</Message>
              )}
            </div>
            <AuthButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                submitSignUpData();
              }}
              className="text-black bg-[rgba(255,149,0,0.8)]"
            >
              회원가입
            </AuthButton>
          </form>
        </BlueBoard>
      </main>
    </>
  );
}
