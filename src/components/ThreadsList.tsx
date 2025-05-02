import threadsData from "../data/threadsData.json";
import Threads from "./Threads"; // Threads 컴포넌트

export default function ThreadsList() {
  return (
    <div className="flex flex-col gap-6">
      {threadsData.map((thread, index) => (
        <Threads key={index} {...thread} /> // 각 데이터가 props로 전달됨
      ))}
    </div>
  );
}
