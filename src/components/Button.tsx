import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
}
export default function Button({
  children,
  onClick,
  className,
  type,
}: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={twMerge(
          "text-[16px] w-[93px] h-[35px] cursor-pointer bg-[#0033A0] text-white rounded-[10px] flex items-center justify-center hover:bg-[#ffffff] hover:border-1 hover:border-[#0033A0] hover:text-[#0033A0] transition",
          className
        )}
      >
        {children}
      </button>
    </>
  );
}
