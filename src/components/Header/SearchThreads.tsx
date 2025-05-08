import { useEffect, useState } from "react";
interface Props {
  keyword: string;
  results: any[];
}
export default function SearchThreads({ keyword, results }: Props) {
  const [searchThreads, setSearchThreads] = useState<{ postTitle: string; postContent: string }[]>(
    []
  );

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
      <div className="mt-6">
        <div>
          {keyword ? (
            searchThreads && searchThreads.length > 0 ? (
              searchThreads.map((post, idx) => (
                <div key={idx} className="flex mx-4 ">
                  <p className="mr-2 cursor-pointer hover:underline hover:underline-offset-2">
                    {post.postTitle} {post.postContent}
                  </p>
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
