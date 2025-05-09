import { useEffect, useState, useTransition } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { Post } from "../../types/postType";
import Threads from "../FanPage/Threads";
import { useParams } from "react-router";

export default function MyThreadsList() {
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();
  const params = useParams();

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
  }, []);

  if (isPending) <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-6">
      {/* 피드들 */}
      {myPosts?.map((post) => {
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
            // username={post.author?.username ?? "Can not find user"}
            username={"mythread"} // 우선 edit 버튼 보이게 하기 위한 mythread로 전달
            title={postTitle}
            content={postContent}
            date={new Date(post.createdAt).toLocaleDateString()}
            channel={post.channel.name}
            images={post.image ? [post.image] : []}
            likes={post.likes}
            comments={post.comments}
            likeChecked={likeChecked}
            isMyThread={true}
          />
        );
      })}
    </div>
  );
}
