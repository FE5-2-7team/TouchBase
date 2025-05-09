import AuthButton from "./AuthButton";
import Button from "../FanPage/Button";
import Input from "./AuthInput";
import BlueBoard from "./BlueBoard";
import { useState } from "react";
import { BaseUser } from "../../types/postType.ts";
import { axiosInstance } from "../../api/axiosInstance.ts";
import { useNavigate } from "react-router";
import Message from "./Message.tsx";
import Swal from "sweetalert2";

export default function SignUp() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [value, setValue] = useState({
    nickName: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const [valid, setValid] = useState({
    nickName: false,
    email: false,
    password: false,
    checkPassword: false,
  });

  const [nickNameValid, setNickNameValid] = useState(false);

  const submitValid = [
    ...Object.values(value),
    ...Object.values(valid),
    nickNameValid,
  ];

  //input type에 유효성 검사
  function validChecked(e: React.ChangeEvent<HTMLInputElement>, type: string) {
    let isValid: boolean = false;

    switch (type) {
      case "nickName":
        isValid = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(e.target.value);
        setNickNameValid(false);
        break;
      case "email":
        isValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
          e.target.value
        );
        break;
      case "password":
        isValid = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/.test(e.target.value);
        if (e.target.value === value.checkPassword) {
          setValid((valid) => {
            return { ...valid, checkPassword: true };
          });
        }
        break;
      case "checkPassword":
        isValid = e.target.value === value.password;
        break;
    }

    setValue((value) => {
      return { ...value, [type]: e.target.value };
    });
    setValid((valid) => {
      return { ...valid, [type]: isValid };
    });
    console.log(valid, value);
  }

  //비밀번호 체크 인풋에 포커스 들어갈 때
  function retestFocusIn() {
    if (value.checkPassword === value.password) {
      setValid((valid) => {
        return { ...valid, checkPassword: false };
      });
      return;
    }
    setValid((valid) => {
      return { ...valid, checkPassword: true };
    });
  }

  //닉네임 유효성 검사
  async function validNickName() {
    if (value.nickName === "" || !valid.nickName) return;

    try {
      const response = await fetch(`${baseUrl}users/get-users`);
      const json = await response.json();
      const result = json.some(
        (el: BaseUser) => el.fullName === value.nickName
      );
      console.log(json, result);
      if (!result) {
        setNickNameValid(true);
      } else {
        setNickNameValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //회원가입 data submit
  async function submitSignUpData() {
    console.log(submitValid);
    if (submitValid.some((vaild) => vaild == false)) {
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: "유효하지 않은 아이디 혹은 이메일, 비밀번호 입니다 ",
        confirmButtonText: "다시 시도",
      });
      return;
    }

    let response;

    try {
      response = await axiosInstance.post(`/signup`, {
        email: value.email.toLocaleLowerCase().trim(),
        fullName: value.nickName.toLocaleLowerCase().trim(),
        password: value.password.toLocaleLowerCase().trim(),
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setNickNameValid(true);
      setValue((value) => {
        return { ...value };
      });
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
                onChange={(e) => validChecked(e, "nickName")}
                value={value.nickName}
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
              {value.nickName && !valid.nickName && (
                <Message>공백 혹은 특수 문자는 넣으실 수 없습니다</Message>
              )}
              {nickNameValid && (
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
                value={value.email}
                onChange={(e) => {
                  validChecked(e, "email");
                }}
              />
              {value.email && !valid.email && (
                <Message>이메일 형식이 올바르지 않습니다</Message>
              )}
            </div>
            <div className="relative mb-[35px]">
              <Input
                placeholder={"비밀번호"}
                type="password"
                className="mb-[0]"
                value={value.password}
                onChange={(e) => validChecked(e, "password")}
              />
              {value.password && !valid.password && (
                <Message>8~16자, 영문, 숫자 조합 입니다</Message>
              )}
            </div>
            <div className="relative mb-[35px]">
              <Input
                onFocus={retestFocusIn}
                onChange={(e) => validChecked(e, "checkPassword")}
                value={value.checkPassword}
                placeholder={"비밀번호 확인"}
                type="password"
                className="mb-[35px]"
              />
              {value.checkPassword && !valid.checkPassword && (
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
