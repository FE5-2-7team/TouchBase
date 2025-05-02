export default function CommentIcon({ size = 18, color = "#939393" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 
        2-.9 2-2V4c0-1.1-.9-2-2-2z"
      />
    </svg>
  );
}
