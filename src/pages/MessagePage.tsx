import Inbox from "../components/Inbox";
import MessageSidebar from "../components/MessageSidebar";

export default function MessagePage() {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex w-[75%]">
          <div className="w-[259px] border-r border-r-gray-200">
            <MessageSidebar />
          </div>

          <div className="flex-1 pl-6">
            <Inbox />
          </div>
        </div>
      </div>
    </>
  );
}
