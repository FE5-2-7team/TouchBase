import { twMerge } from "tailwind-merge";

export default function MainTitle({
  title,
  color,
  white = false,
}: {
  title: string;
  color: string;
  white?: boolean;
}) {
  return (
    <span
      className={twMerge(
        "text-2xl font-bold border-b-4 pb-2",
        white ? "text-white" : "text-black",
        `border-[${color}]`
      )}
    >
      {title}
    </span>
  );
}
