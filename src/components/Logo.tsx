import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <Link to={"/"} aria-label="로고 이미지 클릭 시 홈으로 이동">
        <img
          src="https://i.namu.wiki/i/e2Kqg6wAtcjt9_BsX_xsRPv8sPv_7xG2V8e7nrCNAOujtMbPMV4oYX0anTsBQil6smGJHMkHnlIWhqz6rAazZA.svg"
          className={twMerge("w-[433px] mb-[21px] cursor-pointer", className)}
          alt="로고 이미지"
        />
      </Link>
    </>
  );
}
