import Logo from "./Logo";
import ProfileImage from "./ProfileImage";
import AuthInput from "./AuthInput";
import advertisement from "../../assets/images/advertisement.svg";
import footerLogo from "../../assets/images/smallLogo.png";
import { Link, useNavigate, useParams } from "react-router";
import BlueBoard from "./BlueBoard";
import Button from "../FanPage/Button";
import { useState, useEffect } from "react";
import { editValidation } from "./inputValidation.ts";
import { SignUpValue1 } from "../../types/userTypes.ts";
import Message from "./Message.tsx";
import { logout } from "../../api/auth";
import { axiosInstance } from "../../api/axiosInstance.ts";

export default function EditProfile() {
  //url로 넘어온 id
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [render, setRender] = useState(true);

  const { name, password, checkPassword } = value;

  //ui userInfo에 들어갈 정보
  const [info, setInfo] = useState({
    id: "",
    fullName: "",
    email: "",
    followers: [] as string[],
    following: [] as string[],
  });

  //마운트 될 때 user정보 갱신
  async function urlValidation(id: string) {
    //sessionId는 로그인 한 유저의 정보
    let logInId;
    const sessionData = sessionStorage.getItem("user");
    if (sessionData) {
      //한번 로그인을 해서 sesstionstorage는 있지만 로그인한 유저인지 확인
      const parsed = JSON.parse(sessionData);
      if (!parsed.state.user) navigate("/login", { replace: true });
      logInId = parsed.state.user._id;
    } else {
      //getitem이 null이면 로그인 하지 않은 유저
      navigate("/login", { replace: true });
    }

    //url로 넘어온 id 검사
    let response;

    try {
      response = await axiosInstance(`users/${id}`);
      console.log(response);
    } catch (err) {
      navigate("*", { replace: true });
      console.log(err);
      return;
    }

    //url 파라미터로 받아온 user 정보 구조 분해
    const { _id, followers, following, fullName, email } = response.data;

    //파라미터로 넘어온 id 값이랑 로그인 된 유저 정보rk 담긴 세션 id 값이랑 비교(url)
    if (logInId === _id) {
      setInfo((info) => {
        return {
          ...info,
          id: _id,
          fullName: fullName,
          email: email,
          followers: followers,
          following: following,
        };
      });
      console.log(info);
    } else {
      navigate("*", { replace: true });
    }
  }
  type FieldType = "name" | "checkPassword";

  const handleUpdateUser = async (
    data: { valid: boolean; content: string },
    type: FieldType
  ) => {
    //input 상태 검사
    for (const keys in data) {
      if (data[keys as keyof typeof data] == false) return;
    }

    const response =
      type === "name"
        ? await axiosInstance.put("settings/update-user", {
            fullName: data.content,
            username: "",
          })
        : await axiosInstance.put("settings/update-password", {
            password: data.content,
          });

    if (response.status !== 200) return;

    if (type === "checkPassword") {
      navigate("/login");
      return;
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

    setRender((render) => !render);
  };

  useEffect(() => {
    if (id) {
      urlValidation(id);
    } else {
      navigate("*", { replace: true });
    }
  }, [id, render]);

  //input onChnage 유효성 검사 - 재사용 모듈화 하기 -
  function handleInputValidation(
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

  const userInfo = [
    { title: "내 프로필" },
    { title: "내 팔로워", content: `${info.followers.length}` },
    { title: "내 팔로잉", content: `${info.following.length}` },
  ];

  return (
    <>
      <div className="flex h-fit">
        <div className="min-w-[420px] w-[39%] flex justify-end shadow-[4px_0_10px_rgba(0,0,0,0.15)]">
          <aside className="h-full w-[420px] border-x border-x-[#E4E4E4] px-[63px] py-[30px] flex flex-col items-center">
            <Logo className="w-[156px] mb-[30px]" />
            <ProfileImage className="mb-[12px]" />
            <p className="text-[24px] font-bold cursor-default">
              {info.fullName}
            </p>
            <p className="text-[14px] text-[#7C7B7B] font-regular mb-[42px] cursor-default">
              {info.email}
            </p>
            <div className="w-full py-[50px] border-y border-[#E4E4E4] flex flex-col gap-[35px] font-sans">
              {userInfo.map((user, idx) => {
                if (idx === 0) {
                  return (
                    <div className="w-full flex justify-between" key={idx}>
                      <div
                        onClick={() => {
                          console.log(info.id);
                          navigate(`/profile/${info.id}/posts`);
                        }}
                        className="w-content-fit h-[32px] text-[20px] text-[#5A5A5A] cursor-pointer hover:text-[#FF9500] hover:border-b"
                      >
                        {user.title}
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="w-full flex justify-between" key={idx}>
                    <div className="w-content-fit h-[32px] text-[20px] text-[#5A5A5A] cursor-pointer hover:text-[#FF9500] hover:border-b">
                      {user.title}
                    </div>
                    <div className="w-[50%] text-[20px] text-[#5A5A5A]">
                      {user.content}
                    </div>
                  </div>
                );
              })}
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
              className="w-full cursor-pointer mb-[25px]"
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
              <h2 className="text-[16px] text-[#464646] mb-[7px]">
                프로필 이미지 변경
              </h2>
              <Button className="w-[80px] h-[40px] text-[14px] rounded-[5px]">
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
                onChange={(e) => handleInputValidation(e, "name", value)}
                className="h-[40px] mb-[0] max-w-[475px]"
              />
              <Button onClick={() => handleUpdateUser(name, "name")}>
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
                onChange={(e) => handleInputValidation(e, "password", value)}
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
                onChange={(e) =>
                  handleInputValidation(e, "checkPassword", value)
                }
                className="h-[40px] mb-[0] max-w-[475px]"
              />
              <Button
                onClick={() => handleUpdateUser(checkPassword, "checkPassword")}
                className="w-[80px] h-[40px] text-[14px] rounded-[5px]"
              >
                변경하기
              </Button>
              {checkPassword.content && !checkPassword.valid && (
                <Message>비밀번호가 일치하지 않습니다</Message>
              )}
            </div>
          </BlueBoard>
          <BlueBoard className="py-[25px] px-[23px] w-full max-w-[650px] bg-white mt-[20px]">
            <h2 className="text-[16px] text-[#464646] mb-[7px]">구단 변경</h2>
            <p className="text-[14px] text-[#6D6D6D] mb-[48px] font-medium">
              응원하는 구단을 선택해 주세요
            </p>
            <div className="flex gap-[44px] justify-between">
              <select className="text-gray-400 px-[4px] border-b border-[#0033A0] font-semibold dark:text-white dark:placeholder:text-white h-[40px] mb-[0] w-[475px]">
                <option>구단 선택</option>
                <option>SSG 랜더스</option>
                <option>LG 트윈스</option>
                <option>KT 위즈</option>
                <option>NC 다이노스</option>
                <option>KIA 타이거즈</option>
                <option>삼성 라이온즈</option>
                <option>두산 베어스</option>
                <option>롯데 자이언츠</option>
                <option>한화 이글스</option>
                <option>키움 히어로즈</option>
              </select>
              <Button className="w-[80px] h-[40px] text-[14px] rounded-[5px]">
                변경하기
              </Button>
            </div>
          </BlueBoard>
        </div>
      </div>
    </>
  );
}
