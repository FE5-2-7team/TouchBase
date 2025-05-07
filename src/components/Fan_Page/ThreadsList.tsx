import threadsData from "../../data/threadsData.json";
import Threads from "./Threads";

export default function ThreadsList() {
  return (
    <div className="flex flex-col gap-6">
      {threadsData.map((thread, index) => (
        <Threads key={index} {...thread} />
      ))}
    </div>
  );
}
