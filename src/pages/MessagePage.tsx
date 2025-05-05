import MessageSidebar from "../components/MessageSidebar";
import { Outlet } from "react-router";

export default function MessagePage() {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex md:w-[85%] mt-[150px] ">
          <div className="w-[259px] border-r border-r-gray-200">
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
