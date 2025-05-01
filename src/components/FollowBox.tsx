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

export default function FollowBox({ title }) {
  return (
    <div className="w-[450px] h-[550px] flex flex-col items-center p-[27px] rounded-[10px] shadow-[0px_0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center self-start text-[20px] font-bold mb-[12px]">
        <LuUserCheck size={26} className="mr-[11px]" />
        모든 {title}
      </div>
      {users.map((user) => (
        <FollowCard name={user.name} isOnline={user.isOnline} />
      ))}
    </div>
  );
}
