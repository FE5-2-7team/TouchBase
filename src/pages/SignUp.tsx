import AuthButton from "../components/AuthButton";
import Button from "../components/Button";
import Input from "../components/AuthInput";
import BlueBoard from "../components/BlueBoard";
import AuthBoard from "../components/AuthBoard";
import Logo from "../components/Logo";
import { useState } from "react";

export default function SignUpPage() {
  useState();
  // function passwordVerification(value){
  //   if(value)

  // }
  return (
    <>
      <AuthBoard>
        <header>
          <Logo />
        </header>
        <main>
          <BlueBoard>
            <form className="w-full">
              <div className="w-full flex gap-[20px] mb-[35px] items-center">
                <Input
                  placeholder={"이메일"}
                  type="email"
                  className="w-full max-w-[319px] mb-0"
                />
                <Button
                  type="button"
                  className="bg-[rgba(0,51,160,0.4)] rounded-[5px] text-[16px] hover:bg-[rgba(0,51,160,1)] hover:text-[#fff] transition"
                >
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
                <Button
                  type="button"
                  className="bg-[rgba(0,51,160,0.4)] rounded-[5px] text-[16px] hover:bg-[rgba(0,51,160,1)] hover:text-[#fff] transition"
                >
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
      </AuthBoard>
    </>
  );
}
