import Sidebar from "../components/FanPage/Sidebar";
// import ThreadDetail from "../components/FanPage/ThreadDetail";
import { useParams } from "react-router";
// import { axiosInstance } from "../api/axiosInstance";

export default function DetailFanPage() {
  const { teamName } = useParams<{ teamName: string }>();
  const typeTeamName = teamName as string;

  // const postApi = async() => {
  //   try {

  //       await axiosInstance.get('post/{postId}', {

  //       })

  //   }
  // }

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
