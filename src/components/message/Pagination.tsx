export default function Pagination() {
  return (
    <>
      <div className="flex justify-center items-center gap-6 mt-[370px]">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            className="px-2 pt-1 cursor-pointer hover:bg-gray-200 hover:rounded dark:hover:white dark:hover:bg-gray-700"
            key={num}
          >
            {num}
          </button>
        ))}
      </div>
    </>
  );
}
