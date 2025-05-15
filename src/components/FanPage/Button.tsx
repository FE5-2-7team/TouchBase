import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className,
  disabled,
}: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={twMerge(
          "text-[16px] w-[90px] h-[35px] cursor-pointer bg-[#0033A0] text-white rounded-[10px] flex items-center justify-center hover:bg-[#ffffff] hover:border-1 hover:border-[#0033A0] hover:text-[#0033A0] transition dark:bg-[#235BD2] dark:text-[#fff]",
          className
        )}
      >
        {children}
      </button>
    </>
  );
}
