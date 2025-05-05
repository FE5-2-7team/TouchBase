export interface EmptyMessageProps {
  message?: string;
}

export default function EmptyMessage({ message = "쪽지가 없습니다." }: EmptyMessageProps) {
  return (
    <>
      <div className="flex justify-center items-center h-[300px] text-lg text-gray-500">
        {message}
      </div>
    </>
  );
}
