import { useEffect, useState, useTransition } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { Post } from "../../types/postType";
import Threads from "../FanPage/Threads";
import { useParams } from "react-router";
import { refreshStore } from "../../stores/refreshStore";
import EmptyContent from "./EmptyContent";

export default function MyThreadsList() {
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const refresh = refreshStore((state) => state.refresh);

  const getHandler = async () => {
    try {
      const { data } = await axiosInstance.get(`/posts/author/${params.id}`);
      setMyPosts(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      await getHandler();
    });
  }, [refresh]);

  if (isPending) <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-6 mb-[40px]">
      {/* 피드들 */}
      {myPosts.length > 0 ? (
        myPosts?.map((post) => {
          let postTitle = "";
          let postContent = "";

          try {
            const parsedTitle = JSON.parse(post.title);
            postTitle = parsedTitle[0].postTitle;
            postContent = parsedTitle[0].postContent;
          } catch (e) {
            console.error("파싱실패", e);
          }

          const likeChecked = post.likes.some((like) => like.user === params.id);

          return (
            <Threads
              key={post._id}
              postId={post._id}
              username={post.author?.username ?? post.author?.fullName}
              postUserId={post.author._id}
              title={postTitle}
              content={postContent}
              date={new Date(post.createdAt).toLocaleDateString()}
              channel={post.channel.name}
              images={post.image ? [post.image] : []}
              likes={post.likes}
              comments={post.comments}
              likeChecked={likeChecked}
            />
          );
        })
      ) : (
        <div className="h-[550px] border border-[#d9d9d9] shadow-md px-[27px] rounded-[10px] flex justify-center">
          <EmptyContent message="게시물을 작성해보세요"></EmptyContent>
        </div>
      )}
    </div>
  );
}
