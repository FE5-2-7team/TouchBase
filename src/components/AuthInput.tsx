import { twMerge } from "tailwind-merge";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function Input({
  placeholder,
  className,
  type,
}: {
  placeholder: string;
  className?: string;
  type?: string;
}) {
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
            type={type}
          ></input>
          <span className="absolute right-1 top-[11px] cursor-pointer">
            <MdOutlineRemoveRedEye className="text-[#909090]" />
          </span>
        </div>
      )}
    </>
  );
}
