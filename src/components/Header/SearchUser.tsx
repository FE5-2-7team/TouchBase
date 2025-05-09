import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
export default function SearchUser({ keyword, results }: { keyword: string; results: any[] }) {
  const filterUsers = results.filter((user: any) => {
    const trimkeyword = keyword?.toLowerCase().trim();

    const username = (user.username ?? "").toLowerCase().trim() || "";
    const fullName = (user.fullName ?? "").toLowerCase().trim() || "";

    return username.includes(trimkeyword) || fullName.includes(trimkeyword);
  });
  console.log(filterUsers);

  return (
    <>
      <div className="dark:text-white block p-1 max-h-[400px] overflow-scroll">
        {keyword ? (
          filterUsers.length > 0 ? (
            filterUsers.map((user) => (
              <div key={user._id} className="user-card flex my-3 mx-6">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.username}
                    className="w-10 h-10 mr-3 rounded-3xl border-1"
                  />
                ) : (
                  <div className="w-10 h-10 mr-3 bg-gray-200 dark:white rounded-3xl">
                    <FaUser className="w-6 h-6 ml-2 items-center justify-center mt-2 dark:text-gray-700 text-[#2F6BEB] " />
                  </div>
                )}
                <Link
                  to={`/profile/${user._id}`}
                  className="mt-2 text-md cursor-pointer whitespace-nowrap dark:text-white"
                >
                  {user.username ? user.username : user.fullName}
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-500 mt-20 pb-20">
              일치하는 계정이 없습니다.
            </div>
          )
        ) : null}
      </div>
    </>
  );
}
