import M_logo from "../assets/images/m_logo.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0D1B2A] dark:bg-[#16171B]">
        <div className="container px-4 md:px-0 flex justify-start items-center mx-auto h-[200px] text-white gap-10">
          <div className="hidden md:flex items-center">
            <img
              src={M_logo}
              alt="모바일버전 로고"
              className="mt-[6%] ml-4 h-10 w-fit"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="cursor-pointer hover:text-[#FF9500]">
                개인 정보 처리 방침
              </div>
              |
              <div className="cursor-pointer hover:text-[#FF9500]">
                고객 문의
              </div>
              |
              <div className="cursor-pointer hover:text-[#FF9500]">
                사이트 맵
              </div>
            </div>
            <div>
              (사)한국야구위원회 | 서울시 강남구 강남대로 278 | 02)3460-4600
              <br />
              Copyrightⓒ KBO, All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
