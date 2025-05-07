import { Outlet } from "react-router";
import MessageSidebar from "../components/message/MessageSidebar";

export default function MessagePage() {
  return (
    <>
      <div className="flex justify-center dark:bg-[#191A1E]">
        <div className="flex md:w-[85%]">
          <div className="w-[259px] border-r border-r-gray-200 dark:border-r-gray-700">
            <MessageSidebar />
          </div>

          <div className="flex-1 pl-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
