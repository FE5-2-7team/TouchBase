import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
interface Props {
  keyword: string;
  results: any[];
}
export default function SearchThreads({ keyword, results }: Props) {
  const [searchThreads, setSearchThreads] = useState<{ postTitle: string; postContent: string }[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const allParsed: any[] = [];

    for (const post of results) {
      try {
        if (typeof post.title === "string") {
          const parsed = JSON.parse(post.title); // 배열로 파싱됨
          if (Array.isArray(parsed)) {
            allParsed.push(...parsed);
          }
        }
      } catch (err) {
        console.error("파싱 실패:", post.title);
      }
    }

    setSearchThreads(allParsed);
  }, [results]);

  return (
    <>
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-3 p-4 max-h-[400px] overflow-scroll">
          {keyword ? (
            searchThreads && searchThreads.length > 0 ? (
              searchThreads.map((post, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-white rounded-lg border border-gray-300 hover:shadow-sm hover:bg-gray-100 dark:bg-[#191A1E] dark:border-gray-700 dark:hover:bg-gray-600"
                  onClick={() => {
                    console.log(post.postTitle);
                    navigate(`/post/${post.postTitle}`);
                  }}
                >
                  <h4 className="ml-2 text-sm dark:text-white cursor-pointer">{post.postTitle}</h4>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 mt-30">검색결과가 없습니다.</p>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
