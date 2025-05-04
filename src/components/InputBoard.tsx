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
      <section className="w-full flex flex-col items-center pt-[16px]">
        <div className="">
          <img
            src="https://i.namu.wiki/i/e2Kqg6wAtcjt9_BsX_xsRPv8sPv_7xG2V8e7nrCNAOujtMbPMV4oYX0anTsBQil6smGJHMkHnlIWhqz6rAazZA.svg"
            width="460"
            alt="로고 이미지"
            className="mb-[30px] cursor-pointer"
          />
        </div>
        <div
          className={twMerge(
            "w-full max-w-[500px] min-w-[288px] rounded-[5px] p-[35px] shadow-[0_0_4px_rgba(0,51,160,0.25)] mb-[100px]",
            className
          )}
        >
          {children}
        </div>
      </section>
    </>
  );
}
