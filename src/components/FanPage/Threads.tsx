import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import ProfileBlock from "./ProfileBlock";
import SimpleProfileCard from "./SimpleProfileCard";
import Comments from "./Comments";
import MyThreads from "./MyThreads";
import Upload from "./Upload";
import { AxiosError } from "axios";
import { axiosInstance } from "../../api/axiosInstance";
import { Like, Comment } from "../../types/postType";
import { useUserStore } from "../../stores/useUserStore";
interface ThreadProps {
  postId: string;
  username: string;
  title: string;
  content: string;
  date: string;
  channel: string;
  images?: string[];
  likes: Like[];
  comments: Comment[];
  likeChecked: boolean;
  isMyThread?: boolean;
}

export default function Threads({
  postId,
  username,
  title,
  content,
  date,
  // channel,
  images = [],
  likes,
  comments,
  likeChecked,
}: // isMyThread = false,
ThreadProps) {
  const [showed, setShowed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [heartCount, setHeartCount] = useState(likes.length);
  const [heart, setHeart] = useState(likeChecked);

  const userId = useUserStore((state) => state.getUser()?._id);

  // 포스트 수정
  const [isEdit, setIsEdit] = useState(false);

  // 수정, 삭제
  const editHandler = () => {
    setIsEdit(true);
    console.log("수정");
  };

  const editFinishHandler = () => {
    setIsEdit(false);
  };

  const deleteHandler = () => {
    console.log("삭제");
  };

  // 좋아요 on & off
  const toggleHeart = async () => {
    try {
      if (!heart) {
        await axiosInstance.post("/likes/create", {
          postId: postId,
        });
      } else {
        const likedUser = likes.find((like) => like.user === userId);
        const likedId = likedUser?._id;

        await axiosInstance.delete("/likes/delete", {
          data: {
            id: likedId,
          },
        });
      }
      setHeart((prev) => !prev);
      setHeartCount((prev) => (heart ? prev - 1 : prev + 1));
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.response?.data || err.message);
    }
  };

  // 댓글 on & off
  const toggleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  if (isEdit) {
    return (
      <Upload
        titleValue={title}
        contentValue={content}
        imageList={images}
        editFinishHandler={editFinishHandler}
      />
    );
  }

  return (
    <div
      className="w-full max-w-full md:max-w-[1200px] relative mx-auto shadow-md rounded-[10px] 
      border border-[#d9d9d9] p-[24px] flex flex-col gap-[20px]"
    >
      {/* 상단: 프로필 + 본문 */}
      <div className="flex gap-[25px]">
        {/* 왼쪽 고정 프로필 */}
        <div
          onMouseEnter={() => setShowed(true)}
          onMouseLeave={() => setShowed(false)}
        >
          <ProfileBlock username={username} />
          {showed && (
            <div className="absolute z-50 w-[285px] top-5 left-[90px]">
              <SimpleProfileCard />
            </div>
          )}
        </div>

        {/* 본문 내용 */}
        <div className="flex flex-col w-full justify-center">
          <div className="flex items-center gap-2 text-[16px] font-semibold mb-[10px]">
            <span>{title}</span>
            <span className="text-[14px] text-[#ababab]">{date}</span>
          </div>
          <div className="text-[16px] mb-[10px]">{content}</div>
          {/* 이미지가 있을 때만 보여주기 */}
          {images.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-2">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`img-${index}`}
                  className="w-[70%] rounded-[6px]"
                />
              ))}
            </div>
          )}
          <div className="flex justify-between items-center text-[#ababab] text-[16px] mt-auto">
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 hover:cursor-pointer"
                onClick={toggleHeart}
              >
                {heart ? (
                  <FaHeart className="text-[18px] text-red-500" />
                ) : (
                  <FaRegHeart className="text-[18px]" />
                )}
                {heartCount}
              </button>
              <button
                className="flex items-center gap-1 hover:cursor-pointer"
                onClick={toggleShowComments}
              >
                <FaRegComment className="text-[18px]" /> {commentList.length}
              </button>
            </div>

            {/* 게시물 작성자와 로그인 계정이 일치할 경우 (임시로 username === "mythread") */}
            {username === "mythread" && (
              <MyThreads onEdit={editHandler} onDelete={deleteHandler} />
            )}
          </div>
        </div>
      </div>

      {showComments && (
        <div className="w-full overflow-hidden transition-all ease-in-out">
          <Comments
            postId={postId}
            commentList={commentList}
            setCommentList={setCommentList}
          />
        </div>
      )}
    </div>
  );
}
