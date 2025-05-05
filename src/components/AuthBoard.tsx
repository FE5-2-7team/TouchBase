import React, { ReactNode } from "react";
export default function InputBoard({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  return (
    <>
      <section className="w-full flex flex-col items-center pt-[130px]">
        <div>
          <img
            src="https://i.namu.wiki/i/e2Kqg6wAtcjt9_BsX_xsRPv8sPv_7xG2V8e7nrCNAOujtMbPMV4oYX0anTsBQil6smGJHMkHnlIWhqz6rAazZA.svg"
            width="460"
            alt="로고 이미지"
            className="mb-[30px] cursor-pointer"
          />
        </div>
        {children}
      </section>
    </>
  );
}
