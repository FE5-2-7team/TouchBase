import Threads from "./Threads";
import { axiosInstance } from "../../api/axiosInstance";
import { Post } from "../../types/postType";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userStore } from "../../stores/userStore";
import { refreshStore } from "../../stores/refreshStore";
import type { Location } from "react-router";

export default function ThreadsList({ location }: { location: Location }) {
  const { teamName, channelId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const refresh = refreshStore((state) => state.refresh);

  const userId = userStore.getState().getUser()?._id;

  const params = new URLSearchParams(location.search);
  const isSortPage = params.get("sort") === "like";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postRes = await axiosInstance.get(`/posts/channel/${channelId}`);
        setPosts(postRes.data);
        console.log(postRes.data);
      } catch (error) {
        console.log("로드실패", error);
      }
    };
    fetchPosts();
  }, [channelId, refresh]);

  const filterPosts = posts.filter((post) => post.channel.name === teamName);

  const sortedPosts = isSortPage
    ? [...filterPosts].sort((a, b) => b.likes.length - a.likes.length)
    : filterPosts;
  return (
    <div className="flex flex-col gap-6">
      {/* 피드들 */}

      {sortedPosts.map((post) => {
        let postTitle = "";
        let postContent = "";

        try {
          const parsedTitle = JSON.parse(post.title);
          postTitle = parsedTitle[0].postTitle;
          postContent = parsedTitle[0].postContent;
        } catch (e) {
          console.error("파싱실패", e);
        }

        const likeChecked = post.likes.some((like) => like.user === userId);

        return (
          <Threads
            key={post._id}
            postId={post._id}
            username={post.author.username || post.author.fullName}
            postUserId={post.author._id}
            author={post.author}
            title={postTitle}
            content={postContent}
            date={new Date(post.createdAt).toLocaleDateString()}
            channel={post.channel.name}
            images={post.image ?? ""}
            imagesPublicId={post.imagePublicId ?? null}
            likes={post.likes}
            comments={post.comments}
            likeChecked={likeChecked}
            channelId={post.channel._id}
          />
        );
      })}
    </div>
  );
}
