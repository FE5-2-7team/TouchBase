export default function MainTitle({
  title,
  color,
}: {
  title: string;
  color: string;
}) {
  return (
    <span className={`text-2xl font-bold border-b-4 border-[${color}] pb-2`}>
      {title}
    </span>
  );
}
