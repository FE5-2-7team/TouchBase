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
import inputValidation from "./inputValidation.ts";
import { SignUpValue } from "../../types/userTypes.ts";
import { login } from "../../api/auth";

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

  //input 유효성 검사
  function handleInputValidation(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    value: SignUpValue
  ) {
    const isValid = inputValidation(e, type, value);

    if (type === "nickName") {
      setNickNameValid(false);
    } else if (type === "password") {
      if (e.target.value === value.checkPassword) {
        setValid((valid) => {
          return { ...valid, checkPassword: true };
        });
      }
    }

    setValue((value) => {
      return { ...value, [type]: e.target.value };
    });
    setValid((valid) => {
      return { ...valid, [type]: isValid };
    });
  }

  //비밀번호 체크 인풋에 포커스 들어갈 때 유효성 검사
  function handleCheckPasswordFocus() {
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
  async function handleNickNameCheck() {
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

  const showValidationErrorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "회원가입 실패",
      text: "유효하지 않은 아이디 혹은 이메일, 비밀번호 입니다 ",
      confirmButtonText: "다시 시도",
    });
  };

  //회원가입
  async function handleSignUpSubmit() {
    //input 유효성 체크
    if (!submitValid.every((vaild) => !!vaild)) {
      showValidationErrorAlert();
      return;
    }

    try {
      //회원가입 데이터 post
      const response = await axiosInstance.post(`/signup`, {
        email: value.email.toLocaleLowerCase().trim(),
        fullName: value.nickName.toLocaleLowerCase().trim(),
        password: value.password.toLocaleLowerCase().trim(),
      });

      //로그인 기능
      if (response.status === 200) {
        await login({
          email: value.email,
          password: value.password,
        });
        localStorage.setItem("saveId", value.email);
        navigate("/");
      } else {
        showValidationErrorAlert();
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(localStorage.getItem("saveId"));
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
                onChange={(e) => handleInputValidation(e, "nickName", value)}
                value={value.nickName}
              />
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleNickNameCheck();
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
                  handleInputValidation(e, "email", value);
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
                onChange={(e) => handleInputValidation(e, "password", value)}
              />
              {value.password && !valid.password && (
                <Message>8~16자, 영문, 숫자 조합 입니다</Message>
              )}
            </div>
            <div className="relative mb-[35px]">
              <Input
                onFocus={handleCheckPasswordFocus}
                onChange={(e) =>
                  handleInputValidation(e, "checkPassword", value)
                }
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
                handleSignUpSubmit();
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
