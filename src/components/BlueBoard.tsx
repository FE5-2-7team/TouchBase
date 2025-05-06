import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

export default function BlueBoard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        className={twMerge(
          "w-full max-w-[500px] min-w-[288px] rounded-[5px] p-[35px] shadow-[0_0_4px_rgba(0,51,160,0.25)]",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
