import Upload from "../components/Upload";
import Sidebar from "./../components/Sidebar";
import ThreadsList from "./../components/ThreadsList";

export default function FanPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-1 px-2 mt-[250px] md:mt-[200px] md:ml-[50px] md:mr-10">
          <Upload />
          <div className="my-[50px] border-t border-[#d9d9d9] w-full"></div>
          <ThreadsList />
          <div className="m-[30px]"></div>
        </div>
      </div>
    </>
  );
}
