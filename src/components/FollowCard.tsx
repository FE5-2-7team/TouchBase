import { FaUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export default function FollowCard({ name, isOnline }: { name: string; isOnline: boolean }) {
	return (
		<>
			<div className="flex items-center border border-[#335CB3] rounded-[10px] w-[411px] h-[63px] justify-between px-[13px] my-[5px]">
				<div className="relative w-[34px] h-[34px]">
					<FaUserCircle className="absolute w-full h-full" color="#0033A0" />
					<div
						className={twMerge("absolute w-[8px] h-[8px] right-[1px] rounded-[100px] bg-[#00FF1E]", !isOnline && "hidden")}
					/>
				</div>
				<div className="text-[16px] text-[#6D6D6D] w-[100px]">{name}</div>
				<button className="w-[100px] h-[24px] text-[14px] rounded-[10px] bg-[#0033A0] text-[#ffffff] cursor-pointer">
					쪽지 보내기
				</button>
				<button className="w-[100px] h-[24px] text-[14px] rounded-[10px] bg-[#C5585F] text-[#ffffff] cursor-pointer">
					팔로우 취소
				</button>
				<div></div>
			</div>
		</>
	);
}
