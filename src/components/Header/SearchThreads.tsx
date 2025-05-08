import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";

interface Props {
  keyword: string;
}
export default function SearchThreads({ keyword }: Props) {
  const [results, setResults] = useState<{ postTitle: string; postContent: string }[]>([]);

  useEffect(() => {
    const searchThreadList = async () => {
      if (!keyword) return;

      try {
        const res = await axiosInstance.get(`/search/all/${encodeURIComponent(keyword)}`);
        const data = res.data;
        const allParsed: any[] = [];

        for (const post of data) {
          try {
            const parsed = JSON.parse(post.title);
            allParsed.push(...parsed);
          } catch (err) {
            console.error("파싱 실패", post.title);
            setResults([]);
            return;
          }
        }
        setResults(allParsed);
        console.log("API 응답:", allParsed);
      } catch (err) {
        console.error("검색에 실패했습니다.", err);
      }
    };
    searchThreadList();
  }, [keyword]);

  return (
    <>
      <div className="mt-6">
        <div>
          {results && results.length > 0 ? (
            results.map((post: any, idx: number) => (
              <div key={post.idx} className="flex mx-4">
                <p className="mr-2">{post.postTitle}</p>
                <p className="">{post.postContent}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">검색결과가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}
