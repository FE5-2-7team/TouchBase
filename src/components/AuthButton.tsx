import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
type Button = {
  className?: string;
  children: ReactNode;
};

export default function AuthButton({
  className,
  children,
}: Button): React.JSX.Element {
  return (
    <>
      <button
        className={twMerge(
          "text-[20px] w-full h-[65px] cursor-pointer bg-[rgba(0,51,160,1)] font-semibold text-white rounded-[10px] flex items-center justify-center",
          className
        )}
      >
        {children}
      </button>
    </>
  );
}
