import Sidebar from "../components/FanPage/Sidebar";
// import ThreadDetail from "../components/FanPage/ThreadDetail";
import { useParams } from "react-router";
import { axiosInstance } from "../api/axiosInstance";
import { useEffect } from "react";

export default function DetailFanPage() {
  const { teamName, channelId, postId } = useParams<{
    teamName: string;
    channelId: string;
    postId: string;
  }>();
  const typeTeamName = teamName as string;
  //   const typePostId = postId as string;

  //   console.log(channelId);
  useEffect(() => {
    const postApi = async () => {
      try {
        const res = await axiosInstance.get(`posts/${channelId}/${postId}`);
        console.log(res.data);
      } catch (error) {
        console.log("상세페이지 못가져옴!", error);
      }
    };
    postApi();
  }, [channelId, postId]);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-[1500px] mx-auto">
        <Sidebar teamName={typeTeamName} />
        <div className="my-[50px] border-t border-[#d9d9d9] w-full"></div>
        {/* <ThreadDetail
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
            likeChecked={likeChecked}/>
        <div className="m-[30px]"></div> */}
      </div>
    </>
  );
}
