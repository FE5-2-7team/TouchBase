import MainTitle from "./MainTitle";
import { KBONewsTypes, Post } from "../../types/postType";
import { team_list } from "../../utils/getLogoImages";

export default function MainPostList({
  title,
  listId = "post",
  list,
}: {
  title: string;
  listId?: string;
  list: KBONewsTypes[] | Post[];
}) {
  return (
    <div className="w-full">
      <MainTitle
        title={title}
        color={listId === "post" ? "#FF9500" : "#0033A0"}
      />
      {listId === "post" && (
        <div className="flex flex-col gap-4 mt-10 w-full">
          {(list as Post[]).map((item) => (
            <div className="flex flex-row gap-4 cursor-pointer" key={item._id}>
              <>
                <div>
                  <img
                    src={team_list[item.channel.name as keyof typeof team_list]}
                    alt={item.channel.name}
                    className="w-[30px]"
                  />
                </div>
                <div>{item.channel.name}</div>
              </>
              <div className="hover:underline">
                {JSON.parse(item.title)[0].postTitle}
              </div>
            </div>
          ))}
        </div>
      )}
      {listId === "news" && (
        <div className="flex flex-col gap-1 mt-10 w-full ">
          {(list as KBONewsTypes[]).map((item, index) => (
            <a
              key={index}
              href={`https://www.koreabaseball.com/${item.URL_LK}`}
              target="_blank"
              className="flex flex-row gap-4 cursor-pointer hover:underline"
            >
              <div className="mb-4">{item.BD_TT}</div>
            </a>
          ))}
        </div>
      )}
      {list.length === 0 && (
        <div className="flex flex-col gap-4 mt-10 w-full">
          <div className="text-center text-gray-500 dark:text-white">
            게시글이 없습니다.
          </div>
        </div>
      )}
    </div>
  );
}
