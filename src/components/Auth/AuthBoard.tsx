import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function InputBoard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <>
      <div
        className={twMerge(
          "w-full h-screen flex flex-col items-center justify-center px-[16px] dark:bg-black",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
