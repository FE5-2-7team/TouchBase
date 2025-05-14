import Threads from "./Threads";
import { axiosInstance } from "../../api/axiosInstance";
import { Post } from "../../types/postType";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { userStore } from "../../stores/userStore";
import { refreshStore } from "../../stores/refreshStore";
import type { Location } from "react-router";
import ThreadSkeleton from "./ThreadSkeleton";
import { safeParsePost } from "../../utils/parsePost";

export default function ThreadsList({ location }: { location: Location }) {
  const { teamName, channelId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);

  // 스켈렛톤
  const [loading, setLoading] = useState(true);

  const refresh = refreshStore((state) => state.refresh);

  const userId = userStore.getState().getUser()?._id;

  const params = new URLSearchParams(location.search);
  const isSortPage = params.get("sort") === "like";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postRes = await axiosInstance.get(`/posts/channel/${channelId}`);
        setPosts(postRes.data);
      } catch (error) {
        console.log("로드실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [channelId, refresh, location.search]);

  const sortedPosts = useMemo(() => {
    const filterPosts = posts.filter((post) => post.channel.name === teamName);
    return isSortPage
      ? [...filterPosts].sort((a, b) => b.likes.length - a.likes.length)
      : filterPosts;
  }, [posts, teamName, isSortPage]);

  return (
    <div className="flex flex-col gap-6">
      {/* 피드들 */}
      {loading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <ThreadSkeleton key={idx} />
          ))
        : sortedPosts.map((post) => {
            const { postTitle, postContent } = safeParsePost(post.title);
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
                date={new Date(post.updatedAt).toLocaleDateString()}
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
