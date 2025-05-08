import AuthButton from "./AuthButton";
import Button from "../FanPage/Button";
import Input from "./AuthInput";
import BlueBoard from "./BlueBoard";
import { useState } from "react";
import { axiosInstance } from "../../api/axiosInstance.ts";
import { SignupData } from "../../types/postType.ts";

export default function SignUp() {
  const [passwordValue, setPasswordValue] = useState("");

  //state 줄이기
  // const [value, setValue] = useState({
  //   email: "",
  //   nickname:"",
  //   password:"",
  //   vaildPassword:""
  // });

  const [emailVaild, setEmailVaild] = useState(false);
  const [passwordVaild, setPasswordVaild] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(true);

  function emailValidCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValid = emailRegex.test(e.target.value);
    setEmailVaild(!isValid);
  }
  //비밀번호 작성 양식 검사
  function passwordValidCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    const isValid = passwordRegex.test(e.target.value);
    setPasswordValue(e.target.value);
    setPasswordVaild(!isValid);
  }

  //비밀번호 유효성 검사
  function passwordChecking(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheck(e.target.value === passwordValue);
  }

  //비밀번호 비어있을 때 포커스가 빠질 경우
  function passwordFocusOut(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value === "") setPasswordVaild(false);
  }

  //비밀번호 체크 인풋에 포커스 들어갈 때
  function retestFocusIn(e: React.FocusEvent<HTMLInputElement>) {
    setPasswordCheck(false);
    if (e.target.value === passwordValue) setPasswordCheck(true);
  }

  //인풋창이 비어있을 때 포커스가 빠질 경우
  function retestFocusOut(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value === "") setPasswordCheck(true);
  }

  axiosInstance.post("/signup");

  async function sendSignupData(data: SignupData) {
    try {
      const response = await axiosInstance.post("/signup", data);
      console.log("서버 응답:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios 오류:", error.response?.data || error.message);
      } else {
        console.error("예상치 못한 오류:", error);
      }
      throw error; // 필요 시 상위 컴포넌트로 에러 전달
    }
  }

  return (
    <>
      <main>
        <BlueBoard>
          <form className="w-full">
            <div className="w-full flex gap-[20px] mb-[35px] items-center relative">
              <Input
                placeholder={"이메일"}
                type="email"
                className="w-full max-w-[319px] mb-0"
                onChange={emailValidCheck}
              />
              <Button className="bg-[rgba(0,51,160,0.4)] rounded-[5px] text-[16px] hover:bg-[rgba(0,51,160,1)] hover:text-[#fff] transition">
                중복 확인
              </Button>
              {emailVaild && (
                <p className="absolute text-[13px] text-[#CC0000] top-[43px] left-[5px] cursor-default">
                  이메일 형식이 올바르지 않습니다
                </p>
              )}
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
            <div className="relative mb-[35px]">
              <Input
                placeholder={"비밀번호"}
                type="password"
                className="mb-[0]"
                onChange={passwordValidCheck}
                onBlur={passwordFocusOut}
              />
              {passwordVaild && (
                <p className="absolute text-[13px] text-[#CC0000] top-[43px] left-[5px] cursor-default">
                  8~16자, 영문, 숫자 조합 입니다
                </p>
              )}
            </div>
            <div className="relative mb-[35px]">
              <Input
                onFocus={retestFocusIn}
                onChange={passwordChecking}
                onBlur={retestFocusOut}
                placeholder={"비밀번호 확인"}
                type="password"
                className="mb-[35px]"
              />
              {!passwordCheck && (
                <p className="absolute text-[13px] text-[#CC0000] top-[43px] left-[5px] cursor-default">
                  비밀번호가 일치하지 않습니다
                </p>
              )}
            </div>
            <AuthButton className="text-black bg-[rgba(255,149,0,0.8)]">
              회원가입
            </AuthButton>
          </form>
        </BlueBoard>
      </main>
    </>
  );
}
