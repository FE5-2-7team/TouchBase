import Logo from "./Logo";
import ProfileImage from "./ProfileImage";
import AuthInput from "./AuthInput";
import advertisement from "../../assets/images/advertisement.svg";
import footerLogo from "../../assets/images/smallLogo.png";
import { Link } from "react-router";
import BlueBoard from "./BlueBoard";
import Button from "../FanPage/Button";

export default function EditProfile() {
  const userInfo = [
    { title: "내 프로필" },
    { title: "내 팔로워", content: "357" },
    { title: "내 팔로잉", content: "281" },
    { title: "응원 구단", content: "기아 타이거즈" },
  ];
  return (
    <>
      {/* <AuthBoard className="h-auto my-[50px]">
        <main className="w-full flex justify-center">
          <BlueBoard className="px-[94px] py-[67px] flex justify-between max-w-[958px]">
            <div className="flex flex-col items-center font-sans">
              <ProfileImage></ProfileImage>
              <div className="mt-2 text-base font-semibold">홍길동 님</div>
            </div>
            <div className="w-full max-w-[447px]">
              <BlueBoard className="w-full max-w-[447px] min-w-[288px] rounded-[5px] px-[15px] py-[20px] mb-[34px]">
                <form>
                  <h2 className="text-[#464646] font-medium text-[16px] mb-[30px]">
                    닉네임 변경하기
                  </h2>
                  <div className="flex gap-[15px] items-end">
                    <Input
                      className="w-full mb-[0px] max-w-[325px] min-w-[258px] font-normal"
                      placeholder="새 닉네임"
                    ></Input>
                    <Button className="w-[80px] h-[30px] text-[12px] rounded-[5px]">
                      변경하기
                    </Button>
                  </div>
                </form>
              </BlueBoard>
              <BlueBoard className="w-full max-w-[447px] min-w-[288px] rounded-[5px] px-[15px] py-[20px] mb-[34px]">
                <form>
                  <h2 className="text-[#464646] font-medium text-[16px] mb-[30px]">
                    새 비밀번호
                  </h2>
                  <Input
                    className="w-full max-w-[325px] mb-[16px] font-normal min-w-[258px]"
                    placeholder="새 비밀번호"
                    type="password"
                  ></Input>
                  <div className="flex gap-[15px] items-end">
                    <Input
                      className="w-full mb-[0px] max-w-[325px] font-normal min-w-[258px]"
                      placeholder="비밀번호 확인"
                      type="password"
                    ></Input>
                    <Button className="w-[80px] h-[30px] text-[12px] rounded-[5px]">
                      변경하기
                    </Button>
                  </div>
                </form>
              </BlueBoard>
              <BlueBoard className="w-full max-w-[447px] min-w-[288px] rounded-[5px] px-[15px] py-[20px]">
                <form>
                  <h2 className="text-[#464646] font-medium text-[16px] mb-[30px]">
                    구단 변경
                  </h2>
                  <div className="flex gap-[15px] items-end">
                    <select className="w-full max-w-[325px] min-w-[258px] h-[40px] font-normal text-gray-400 px-[0px] border-b border-[#0033A0]">
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
                    <Button className="w-[80px] h-[30px] text-[12px] rounded-[5px]">
                      변경하기
                    </Button>
                  </div>
                </form>
              </BlueBoard>
            </div>
          </BlueBoard>
        </main>
      </AuthBoard> */}
      <div className="flex h-fit">
        <div className="min-w-[420px] w-[39%] flex justify-end shadow-[4px_0_10px_rgba(0,0,0,0.15)]">
          <aside className="h-full w-[420px] border-x border-x-[#E4E4E4] px-[63px] py-[30px] flex flex-col items-center">
            <Logo className="w-[156px] mb-[30px]" />
            <ProfileImage className="mb-[12px]" />
            <p className="text-[24px] font-bold cursor-default">사용자</p>
            <p className="text-[14px] text-[#7C7B7B] font-regular mb-[42px] cursor-default">
              email@google.com
            </p>
            <div className="w-full py-[50px] border-y border-[#E4E4E4] flex flex-col gap-[35px] font-sans">
              {userInfo.map((info, idx) => {
                return (
                  <div className="w-full flex justify-between" key={idx}>
                    <div className="w-content-fit h-[32px] text-[20px] text-[#5A5A5A] cursor-pointer hover:text-[#FF9500] hover:border-b">
                      {info.title}
                    </div>
                    <div className="w-[50%] text-[20px] text-[#5A5A5A]">
                      {info.content}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="py-[30px] w-full">
              <p className="text-[#646464] text-[16px] cursor-pointer mb-[14px] hover:text-[#FF9500]">
                <Link to={"/message"}>내 쪽지함</Link>
              </p>
              <p className="text-[#646464] text-[16px] cursor-pointer hover:text-[#FF9500]">
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
            <div className="flex gap-[44px] justify-between">
              <AuthInput
                placeholder="새 닉네임"
                type="text"
                className="h-[40px] mb-[0] max-w-[475px]"
              />
              <Button className="w-[80px] h-[40px] text-[14px] rounded-[5px]">
                변경하기
              </Button>
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
            <AuthInput
              placeholder="새 비밀번호"
              type="password"
              className="h-[40px] mb-[0] w-[475px]"
            />
            <div className="flex gap-[44px] justify-between">
              <AuthInput
                placeholder="새 비밀번호 확인"
                type="password"
                className="h-[40px] mb-[0] max-w-[475px]"
              />
              <Button className="w-[80px] h-[40px] text-[14px] rounded-[5px]">
                변경하기
              </Button>
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
