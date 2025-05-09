import { useEffect, useRef, useState, useTransition } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import FollowCard from "./FollowCard";
import { LuUserCheck } from "react-icons/lu";
import { ExtendedUser, Follow } from "../../types/postType";
import useGetUser from "./useGetUser";

const USERID = "681c62cf1fef464281ee7341";

export default function FollowBox({ title }: { title: string }) {
  const [followUsers, setFollowUsers] = useState<ExtendedUser[]>();
  const followingIds = useRef<string[]>(null);
  const [isPending, startTransition] = useTransition();

  const user = useGetUser(USERID);

  useEffect(() => {
    if (!user) return;

    const ids: string[] =
      title === "팔로워" ? user.followers.map((f: Follow) => f.follower) : user.following.map((f: Follow) => f.user);

    followingIds.current = user.following.map((f: Follow) => f.user);

    const getUsers = async () => {
      try {
        const results = await Promise.all(ids.map((id) => axiosInstance.get(`/users/${id}`)));
        const users = results.map((res) => res.data);
        setFollowUsers(users);
      } catch (e) {
        console.error(e);
      }
    };

    startTransition(async () => {
      await getUsers();
    });
  }, [user, title]);

  if (isPending) <h1>Loading...</h1>;

  return (
    <div className="h-[550px] flex flex-col items-center p-[27px] rounded-[10px] border border-[#d9d9d9] shadow-md w-full max-w-[1200px] lg:px-[7%] md:px-[27%]">
      <div className="flex items-center self-start text-[20px] font-bold mb-[20px]">
        <LuUserCheck size={26} className="mr-[11px]" />
        모든 {title}
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-x-[100px] gap-y-[8px]">
        {title === "팔로워"
          ? followUsers?.map((follow) => (
              <FollowCard
                name={follow.username ? follow.username : follow.fullName}
                isOnline={follow.isOnline}
                isFollowing={followingIds.current?.includes(follow._id) ?? false}
              />
            ))
          : followUsers?.map((follow) => (
              <FollowCard
                name={follow.username ? follow.username : follow.fullName}
                isOnline={follow.isOnline}
                isFollowing={true}
              />
            ))}
      </div>
    </div>
  );
}
