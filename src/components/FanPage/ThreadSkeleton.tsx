export default function ThreadSkeleton() {
  return (
    <div
      className="w-full p-4 shadow-md rounded-[10px] 
      border border-[#d9d9d9] bg-white dark:bg-[#1e1e1e]"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
      </div>
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
    </div>
  );
}
