import { twMerge } from "tailwind-merge";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

export default function Input({
  placeholder,
  className,
  type,
}: {
  placeholder: string;
  className?: string;
  type?: string;
}) {
  const [passwordShow, setPasswordShow] = useState(false);
  return (
    <>
      {type !== "password" ? (
        <input
          className={twMerge(
            "mb-[30px] w-full h-[40px] text-[#696969] px-[4px] border-b border-[#0033A0] font-semibold",
            className
          )}
          placeholder={placeholder}
          type={type}
        ></input>
      ) : (
        <div className={twMerge("w-full mb-[30px] relative", className)}>
          <input
            className="w-full h-[40px] text-[#696969] px-[4px] border-b border-[#0033A0] font-semibold"
            placeholder={placeholder}
            type={passwordShow ? "password" : "text"}
          ></input>
          <button
            onClick={() => {
              setPasswordShow((passwordShow) => !passwordShow);
            }}
            type="button"
            aria-label={passwordShow ? "비밀번호 보기" : "비밀번호 가리기"}
            className="absolute right-2 top-[11px] cursor-pointer"
          >
            {passwordShow ? (
              <IoEyeOutline className="text-[#909090] text-[24px]" />
            ) : (
              <IoEyeOffOutline className="text-[#909090] text-[24px]" />
            )}
          </button>
        </div>
      )}
    </>
  );
}
