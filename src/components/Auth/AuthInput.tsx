import { twMerge } from "tailwind-merge";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

type InputTypes = {
  placeholder: string;
  className?: string;
  type: string;
  value: string;
  name?: string;
  // setFc?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Input({
  placeholder,
  className,
  type,
  value,
  name,
  onChange,
  onFocus,
  // setFc,
  onKeyDown,
}: InputTypes) {
  const [passwordShow, setPasswordShow] = useState(true);

  // function focusOut(
  //   e: React.FocusEvent<HTMLInputElement>,
  //   setFc: React.Dispatch<
  //     React.SetStateAction<{
  //       ["string"]: boolean;
  //     }>
  //   >
  // ) {
  //   if (e.target.value === "") setFc(valid);
  // }

  return (
    <>
      {type !== "password" ? (
        <input
          className={twMerge(
            "mb-[30px] w-full h-[40px] text-[#696969] px-[4px] border-b border-[#0033A0] font-semibold dark:text-white dark:placeholder:text-white",
            className
          )}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          name={name}
        ></input>
      ) : (
        <div className={twMerge("w-full mb-[30px] relative", className)}>
          <input
            className="w-full h-[40px] text-[#696969] px-[4px] border-b border-[#0033A0] font-semibold dark:text-white dark:placeholder:text-white"
            placeholder={placeholder}
            type={passwordShow ? "password" : "text"}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            // onBlur={(e) => focusOut(e, setFc!)}
            name={name}
            onKeyDown={onKeyDown}
          ></input>
          <button
            onClick={() => {
              setPasswordShow((passwordShow) => !passwordShow);
            }}
            type="button"
            aria-label={passwordShow ? "비밀번호 보기" : "비밀번호 가리기"}
            className="absolute right-2 top-[8px] cursor-pointer"
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
