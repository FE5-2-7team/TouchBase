import { twMerge } from "tailwind-merge";
// import { useDarkMode } from "../hooks/useDarkMode";
export default function MainTitle({
  title,
  color,
  white = false,
}: {
  title: string;
  color: string;
  white?: boolean;
}) {
  // const { isDark } = useDarkMode();

  const textColor = color;

  return (
    <span
      className={twMerge(
        "text-2xl font-bold border-b-4 pb-2 dark:text-white",
        white ? "text-white" : "text-black"
      )}
      style={{ borderColor: textColor }}
    >
      {title}
    </span>
  );
}
