import Upload from "../components/Upload";
import Sidebar from "./../components/Sidebar";
import ThreadsList from "./../components/ThreadsList";

export default function App() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-1 px-2 mt-[30px] md:mt-[50px] md:ml-20 md:mr-10">
          <Upload />
          <div className="my-[60px] border-t border-[#d9d9d9] w-full"></div>
          <ThreadsList />
          <div className="m-[30px]"></div>
        </div>
      </div>
    </>
  );
}
