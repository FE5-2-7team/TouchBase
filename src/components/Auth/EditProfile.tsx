import Logo from "./Logo";
import ProfileImage from "./ProfileImage";
import AuthInput from "./AuthInput";
import advertisement from "../../assets/images/advertisement.svg";
import footerLogo from "../../assets/images/smallLogo.png";
import { Link, useNavigate } from "react-router";
import BlueBoard from "./BlueBoard";
import Button from "../FanPage/Button";
import { useState, useRef } from "react";
import { editValidation } from "./inputValidation.ts";
import { SignUpValue1 } from "../../types/userTypes.ts";
import Message from "./Message.tsx";
import { logout } from "../../api/auth";
import { axiosInstance } from "../../api/axiosInstance.ts";
import { handleimageChange } from "./imageChange.ts";
import { userStore } from "../../stores/userStore";
import { ExtendedUser } from "../../types/postType.ts";
import SelectClub from "./SelectClub.tsx";

export default function EditProfile() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const user = userStore.getState().getUser() as ExtendedUser;
  console.log(user);

  //input value
  const [value, setValue] = useState({
    name: {
      valid: false,
      content: "",
    },
    password: {
      valid: false,
      content: "",
    },
    checkPassword: {
      valid: false,
      content: "",
    },
  });
  const { name, password, checkPassword } = value;

  type FieldType = "name" | "checkPassword";

  //유저 정보 업데이트
  const handleUpdate = async (
    data: { valid: boolean; content: string },
    type: FieldType
  ) => {
    //input validation
    for (const keys in data) {
      if (data[keys as keyof typeof data] == false) return;
    }

    try {
      const response =
        type === "name"
          ? await axiosInstance.put("settings/update-user", {
              fullName: data.content,
              username: user.username,
            })
          : await axiosInstance.put("settings/update-password", {
              password: data.content,
            });
      if (response.status !== 200) throw new Error();

      if (type === "checkPassword") {
        navigate("/login");
        return;
      }
      userStore.getState().setUser(response.data);
    } catch (err) {
      console.log(err);
    }

    setValue((value) => {
      return {
        ...value,
        name: {
          valid: false,
          content: "",
        },
        password: {
          valid: false,
          content: "",
        },
        checkPassword: {
          valid: false,
          content: "",
        },
      };
    });
  };

  //input onChnage 유효성 검사 - 재사용 모듈화 하기 -
  function handleValidation(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "name" | "email" | "password" | "checkPassword",
    value: SignUpValue1
  ) {
    const isValid = editValidation(e, type, value);
    // type이 부분 나중에 value key 값으로 대처하기
    if (type === "password") {
      if (e.target.value === checkPassword.content) {
        setValue((value) => {
          return {
            ...value,
            checkPassword: {
              valid: true,
              content: checkPassword.content,
            },
          };
        });
      }
    }

    setValue((value) => {
      return {
        ...value,
        [type]: {
          valid: isValid,
          content: e.target.value,
        },
      };
    });
  }

  return (
    <>
      <div className="flex h-fit">
        <div className="min-w-[420px] w-[39%] flex justify-end shadow-[4px_0_10px_rgba(0,0,0,0.15)]">
          <aside className="h-full w-[420px] border-x border-x-[#E4E4E4] px-[63px] py-[30px] flex flex-col items-center">
            <Logo className="w-[156px] mb-[30px]" />
            <ProfileImage className="mb-[12px]" src={user.image} />
            <p className="text-[24px] font-bold cursor-default">
              {user.fullName}
            </p>
            <p className="text-[14px] text-[#7C7B7B] font-regular mb-[42px] cursor-default">
              {user.email}
            </p>
            <div className="w-full py-[50px] border-y border-[#E4E4E4] flex flex-col gap-[35px] font-sans">
              <div className="w-full flex justify-between">
                <div className="w-content-fit h-[32px] text-[20px] font-semibold text-[#797979] cursor-pointer hover:text-[#FF9500] hover:border-b">
                  <Link to={`/profile/${user._id}/posts`}>내 프로필</Link>
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="w-content-fit h-[32px] text-[20px] font-semibold text-[#797979] cursor-pointer hover:text-[#FF9500] hover:border-b">
                  내 팔로워
                </div>
                <div className="w-[50%] text-[20px] text-[#5A5A5A]">
                  {user.followers.length}
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="w-content-fit h-[32px] text-[20px] font-semibold text-[#797979] cursor-pointer hover:text-[#FF9500] hover:border-b">
                  내 팔로잉
                </div>
                <div className="w-[50%] text-[20px] text-[#5A5A5A]">
                  {user.following.length}
                </div>
              </div>
            </div>
            <div className="py-[30px] w-full">
              <p className="text-[#646464] text-[16px] cursor-pointer mb-[14px] hover:text-[#FF9500]">
                <Link to={`/message`}>내 쪽지함</Link>
              </p>
              <p
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-[#646464] text-[16px] cursor-pointer hover:text-[#FF9500]"
              >
                로그 아웃
              </p>
            </div>
            <img
              className="w-full cursor-defalut mb-[25px]"
              src={advertisement}
              alt="2025 kbo 시즌 이미지"
            />
            <Link to={"/"}>
              <img
                className="w-[100px]"
                src={footerLogo}
                alt="푸터 로고 이미지"
              ></img>
            </Link>
          </aside>
        </div>
        <div className="bg-[rgba(0,51,160,0.1)] w-[61%] min-w-[650px] px-[105px] font-sans">
          <BlueBoard className="py-[25px] px-[23px] w-full max-w-[650px] bg-white mt-[20px]">
            <div className="flex justify-between items-center">
              <h2 className="text-[16px] text-[#464646]">프로필 이미지 변경</h2>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleimageChange(e)}
                ref={inputRef}
                className="sr-only"
              ></input>
              <Button
                onClick={() => inputRef.current!.click()}
                className="w-[80px] h-[40px] text-[14px] rounded-[5px]"
              >
                변경하기
              </Button>
            </div>
          </BlueBoard>
          <BlueBoard className="py-[25px] px-[23px] w-full max-w-[650px] bg-white mt-[20px]">
            <h2 className="text-[16px] text-[#464646] mb-[7px]">닉네임 변경</h2>
            <p className="text-[14px] text-[#6D6D6D] mb-[48px] font-medium">
              닉네임는 공백을 제외 한 소문자 영문, 한글, 숫자만 사용할 수
              있습니다
            </p>
            <div className="flex gap-[44px] justify-between relative">
              <AuthInput
                placeholder="새 닉네임"
                type="text"
                value={name.content}
                onChange={(e) => handleValidation(e, "name", value)}
                className="h-[40px] mb-[0] max-w-[475px]"
              />
              <Button
                onClick={() => handleUpdate(name, "name")}
                className="w-[80px] h-[40px] text-[14px] rounded-[5px]"
              >
                변경하기
              </Button>
              {name.content && !name.valid && (
                <Message>공백 혹은 특수 문자는 넣으실 수 없습니다</Message>
              )}
            </div>
          </BlueBoard>
          <BlueBoard className="py-[25px] px-[23px] w-full max-w-[650px] bg-white mt-[20px]">
            <h2 className="text-[16px] text-[#464646] mb-[7px]">
              비밀번호 변경
            </h2>
            <p className="text-[14px] text-[#6D6D6D] mb-[48px] font-medium">
              영어(소문자 또는 대문자)와 숫자를 조합해 8자 이상 16자 이하로
              입력해 주세요
            </p>
            <div className="relative mb-[35px]">
              <AuthInput
                placeholder={"새 비밀번호"}
                type="password"
                value={password.content}
                onChange={(e) => handleValidation(e, "password", value)}
                className="h-[40px] mb-[0] max-w-[475px]"
              />
              {password.content && !password.valid && (
                <Message>8~16자, 영문, 숫자 조합 입니다</Message>
              )}
            </div>
            <div className="flex gap-[44px] justify-between relative">
              <AuthInput
                placeholder="새 비밀번호 확인"
                type="password"
                value={checkPassword.content}
                onChange={(e) => handleValidation(e, "checkPassword", value)}
                className="h-[40px] mb-[0] max-w-[475px]"
              />
              <Button
                onClick={() => handleUpdate(checkPassword, "checkPassword")}
                className="w-[80px] h-[40px] text-[14px] rounded-[5px]"
              >
                변경하기
              </Button>
              {checkPassword.content && !checkPassword.valid && (
                <Message>비밀번호가 일치하지 않습니다</Message>
              )}
            </div>
          </BlueBoard>
          <SelectClub />
        </div>
      </div>
    </>
  );
}
