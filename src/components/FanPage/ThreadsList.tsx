// import threadsData from "../../data/threadsData.json";
import Threads from "./Threads";
import axios from "axios";
import { Post } from "../../types/postType";
import { useEffect, useState } from "react";

export default function ThreadsList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const channelDoosan = "68107a7d9157c62f7f214d98";
        const res = await axios.get(
          `http://13.125.208.179:5011/posts/channel/${channelDoosan}`
        );
        setPosts(res.data);
      } catch (error) {
        console.log("로드실패", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <Threads
          key={post._id}
          username={post.author?.username ?? "Can not find user"}
          title={post.title}
          date={new Date(post.createdAt).toLocaleDateString()}
          channel={post.channel.name}
          images={post.image ? [post.image] : []}
          likes={post.likes.length}
          comments={post.comments.length}
        />
      ))}
    </div>
  );
}
