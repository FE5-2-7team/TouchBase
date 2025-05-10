import Threads from "./Threads";
import { axiosInstance } from "../../api/axiosInstance";
import { Post, Channel } from "../../types/postType";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userStore } from "../../stores/userStore";
export default function ThreadsList() {
  const { teamName } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);

  const userId = userStore.getState().getUser()?._id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const channelsRes = await axiosInstance.get(`/channels`);
        const channels = channelsRes.data;

        const matchChannel = channels.find(
          (channel: Channel) => channel.name === teamName
        );
        const channelId = matchChannel._id;

        const postRes = await axiosInstance.get(`/posts/channel/${channelId}`);
        setPosts(postRes.data);
      } catch (error) {
        console.log("로드실패", error);
      }
    };
    fetchPosts();
  }, [teamName]);

  const filterPosts = posts.filter((post) => post.channel.name === teamName);

  return (
    <div className="flex flex-col gap-6">
      {/* 피드들 */}

      {filterPosts.map((post) => {
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
            username={post.author?.username ?? post.author?.fullName}
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
      })}
    </div>
  );
}
