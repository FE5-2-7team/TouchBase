import FollowCard from "./FollowCard";
import { LuUserCheck } from "react-icons/lu";
import { BaseUser } from "../../types/postType";
import useGetUser from "./useGetUser";
import { useParams } from "react-router";

export default function FollowBox({ isFollower }: { isFollower: boolean }) {
  const params = useParams();
  const user: BaseUser | undefined = useGetUser(params.id!);

  return (
    <div className="h-[550px] flex flex-col items-center p-[27px] rounded-[10px] border border-[#d9d9d9] shadow-md w-full max-w-[1200px] lg:px-[7%] md:px-[27%] mb-[40px]">
      <div className="flex items-center self-start text-[20px] font-bold mb-[20px]">
        <LuUserCheck size={26} className="mr-[11px]" />
        {isFollower ? "모든 팔로워" : "모든 팔로잉"}
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-x-[100px] gap-y-[8px]">
        {isFollower
          ? user?.followers.map((follow) => (
              <FollowCard key={follow._id} followId={follow.follower} profileId={follow.user} />
            ))
          : user?.following.map((follow) => (
              <FollowCard key={follow._id} followId={follow.user} profileId={follow.follower} />
            ))}
      </div>
    </div>
  );
}
