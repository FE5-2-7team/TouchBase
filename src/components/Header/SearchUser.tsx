import { FaUser } from "react-icons/fa";

export default function SearchUser({ keyword, results }: { keyword: string; results: any[] }) {
  const filterUsers = results.filter((user: any) => {
    const trimkeyword = keyword?.toLowerCase().trim();

    const username = (user.username ?? "").toLowerCase().trim() || "";
    // const fullName = (user.fullName ?? "").toLowerCase().trim() || "";

    return username.includes(trimkeyword);
  });
  console.log(filterUsers);

  return (
    <>
      <div
        className={`dark:text-white block p-1 pb-2 ${
          filterUsers.length > 0 ? "border-b border-b-gray-400" : ""
        } `}
      >
        {keyword ? (
          filterUsers.length > 0 ? (
            filterUsers.map((user) => (
              <div key={user._id} className="user-card flex my-4">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.username}
                    className="w-10 h-10 rounded-3xl border-1 border-gray-500"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 dark:white rounded-3xl border-1 border-gray-500">
                    <FaUser className="w-6 h-6 m-1.5 dark:text-gray-600 text-[#2F6BEB] " />
                  </div>
                )}
                <p className="mt-1.5 ml-4 cursor-pointer">
                  {user.username ? user.username : user.fullName}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-500 mt-20 border-b border-b-gray-400 pb-20">
              일치하는 계정이 없습니다.
            </div>
          )
        ) : null}
      </div>
    </>
  );
}
