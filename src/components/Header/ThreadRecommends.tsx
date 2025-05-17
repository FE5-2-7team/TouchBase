import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useChannelStore } from "../../stores/channelStore";
import { Post } from "../../types/postType";
import { userStore } from "../../stores/userStore";

export default function ThreadRecommends({ onClose }: { onClose: () => void }) {
  const [recommends, setRecommends] = useState<Post[]>([]);
  const navigate = useNavigate();
  const user = userStore.getState().getUser();
  const isLoggedin = !!user && !!user._id;

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_NEW_POST);
        const data = res.data;

        const allParsed: Post[] = [];

        for (const post of data) {
          try {
            if (typeof post.title === "string") {
              const parsed = JSON.parse(post.title);
              if (Array.isArray(parsed)) {
                allParsed.push(
                  ...parsed.map((item) => ({
                    ...item,
                    _id: post._id,
                    channel: post.channel,
                  }))
                );
              }
            }
          } catch (err) {
            console.error("파싱 실패:", err);
          }
        }
        const randomThreads = allParsed.sort(() => 1 - Math.random());
        setRecommends(randomThreads.slice(0, 7));
      } catch (err) {
        console.error("추천 게시글 불러오기 실패", err);
      }
    };

    fetchThreads();
  }, []);

  return (
    <>
      <h3 className="ml-5 text-sm text-[#2F6BEB] dark:text-gray-400 sm:mt-5">추천 게시글</h3>
      <div className="grid grid-cols-1 gap-3 p-4 mt-2 h-[340px]">
        {recommends.map((post, idx) => {
          const channelId = typeof post.channel === "string" ? post.channel : post.channel._id;
          const teamName = useChannelStore.getState().getChannelName(channelId);
          return (
            <div
              key={idx}
              className="p-2 w-full h-10 bg-white rounded-lg border border-gray-300 hover:shadow-sm hover:bg-gray-100 dark:bg-[#191A1E] dark:border-gray-800 dark:hover:bg-gray-800"
              onClick={() => {
                navigate(isLoggedin ? `/fanpage/${teamName}/${channelId}/${post._id}` : "/login");
                onClose();
              }}
            >
              <div>
                <h4 className="ml-2 text-sm whitespace-nowrap truncate dark:text-white cursor-pointer">
                  {post.postContent ? post.postContent : "제목 없음"}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
