import { twMerge } from "tailwind-merge";

export default function Input({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  return (
    <>
      <input
        className={twMerge(
          "mb-[30px] w-full h-[40px] text-[#696969] px-[4px] border-b border-[#0033A0] font-semibold",
          className
        )}
        placeholder={placeholder}
      ></input>
    </>
  );
}
