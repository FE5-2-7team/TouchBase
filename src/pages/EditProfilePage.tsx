import Input from "../components/AuthInput";
import Button from "../components/Button";
import InputBoard from "../components/AuthBoard";
import { FaUser, FaCamera } from "react-icons/fa";

export default function EditProfilePage() {
  return (
    <>
      <InputBoard className="px-[94px] py-[67px] flex justify-between max-w-[916px]">
        <div className="flex flex-col items-center font-sans">
          <div className="relative w-[179px] h-[179px]">
            <div className="bg-[#2F6BEB] w- h-full rounded-full flex items-center justify-center">
              <FaUser className="text-white text-[80px]" />
            </div>
            <div className="absolute cursor-pointer box-content w-[45px] h-[45px] top-[-4px] right-[-4px] bg-[#ABABAB] rounded-full p-1 flex items-center justify-center border-white border-[6px]">
              <FaCamera className="text-[#fff] text-[29px]" />
            </div>
          </div>
          <div className="mt-2 text-base font-semibold">홍길동 님</div>
        </div>
        <div className="w-full max-w-[447px]">
          <form className="px-[15px] py-[20px] mb-[34px] rounded-[5px] shadow-[0_0_4px_rgba(0,51,160,0.25)] w-full max-w-[447px] min-w-[288px]">
            <div className="text-[#464646] font-medium text-[16px] mb-[30px]">
              닉네임 변경하기
            </div>
            <div className="flex gap-[15px] items-end">
              <Input
                className="w-full mb-[0px] max-w-[325px] font-normal"
                placeholder="새 닉네임"
              ></Input>
              <Button className="w-[80px] h-[30px] text-[12px] rounded-[5px]">
                변경하기
              </Button>
            </div>
          </form>
          <form className="px-[15px] py-[20px] mb-[34px] rounded-[5px] shadow-[0_0_4px_rgba(0,51,160,0.25)] w-full max-w-[447px] min-w-[288px]">
            <div className="text-[#464646] font-medium text-[16px] mb-[30px]">
              새 비밀번호
            </div>
            <Input
              className="w-full max-w-[325px] mb-[16px] font-normal"
              placeholder="새 비밀번호"
            ></Input>
            <div className="flex gap-[15px] items-end">
              <Input
                className="w-full mb-[0px] max-w-[325px] font-normal"
                placeholder="새 비밀번호"
              ></Input>
              <Button className="w-[80px] h-[30px] text-[12px] rounded-[5px]">
                변경하기
              </Button>
            </div>
          </form>
          <form className="px-[15px] py-[20px] rounded-[5px] shadow-[0_0_4px_rgba(0,51,160,0.25)] w-full max-w-[447px] min-w-[288px]">
            <div className="text-[#464646] font-medium text-[16px] mb-[30px]">
              구단 변경
            </div>
            <div className="flex gap-[15px] items-end">
              <select className="w-full max-w-[325px] h-[40px] font-normal text-gray-400 px-[0px] border-b border-[#0033A0]">
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
        </div>
      </InputBoard>
    </>
  );
}
