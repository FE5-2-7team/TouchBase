import { twMerge } from "tailwind-merge";
type Button = {
  className?: string;
  children: string;
};

export default function AuthButton({ className, children }: Button) {
  return (
    <>
      <button
        className={twMerge(
          "text-[20px] w-full h-[65px] cursor-pointer bg-[#0033A0] font-semibold text-white rounded-[10px] flex items-center justify-center",
          className
        )}
      >
        {children}
      </button>
    </>
  );
}
