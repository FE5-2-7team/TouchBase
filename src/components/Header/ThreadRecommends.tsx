import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ThreadRecommends({ onClose }: { onClose: () => void }) {
  const [recommends, setRecommends] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_NEW_POST);
        const data = res.data;

        const allParsed: any[] = [];

        for (const post of data) {
          try {
            if (typeof post.title === "string") {
              const parsed = JSON.parse(post.title);
              if (Array.isArray(parsed)) {
                allParsed.push(...parsed.map((item) => ({ ...item, _id: post._id })));
              }
            }
          } catch (err) {
            console.error("파싱 실패:", post.title);
          }
        }
        const randomThreads = allParsed.sort(() => 1 - Math.random());
        setRecommends(randomThreads.slice(0, 10));
      } catch (err) {
        console.error("추천 게시글 불러오기 실패", err);
      }
    };

    fetchThreads();
  }, []);

  return (
    <>
      <h3 className="ml-5 text-sm text-[#2F6BEB] dark:text-gray-400">추천 게시글</h3>
      <div className="grid grid-cols-1 gap-3 p-4 max-h-[600px] overflow-y-auto">
        {recommends.map((post, idx) => {
          return (
            <div
              key={idx}
              className="p-2 bg-white rounded-lg border border-gray-300 hover:shadow-sm hover:bg-gray-100 dark:bg-[#191A1E] dark:border-gray-800 dark:hover:bg-gray-800"
              onClick={() => {
                navigate(`/channel/${post._id}`);
                onClose();
              }}
            >
              <div>
                <h4 className="ml-2 text-sm dark:text-white cursor-pointer">{post.postTitle}</h4>
                {/* <p className="text-sm text-gray-700 mt-1 dark:text-gray-300 line-clamp-2">
                  {post.postContent}
                </p> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
