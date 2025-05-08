import FollowCard from "./FollowCard";
import { LuUserCheck } from "react-icons/lu";

const users = [
  {
    name: "username1",
    isOnline: true,
  },
  {
    name: "username2",
    isOnline: false,
  },
];

export default function FollowBox({ title }: { title: string }) {
  return (
    <div className="h-[550px] flex flex-col items-center p-[27px] rounded-[10px] border border-[#d9d9d9] shadow-md w-full max-w-[1200px] lg:px-[7%] md:px-[27%]">
      <div className="flex items-center self-start text-[20px] font-bold mb-[20px]">
        <LuUserCheck size={26} className="mr-[11px]" />
        모든 {title}
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-x-[100px] gap-y-[8px]">
        {users.map((user) => (
          <FollowCard name={user.name} isOnline={user.isOnline} />
        ))}
      </div>
    </div>
  );
}
