export interface EmptyMessageProps {
  message: string;
}

export default function EmptyContent({ imgSrc, message }: EmptyMessageProps) {
  return (
    <>
      <div className="flex flex-col justify-center text-gray-400">
        <p className="text-lg">{message}</p>
      </div>
    </>
  );
}
