export default function UndoIcon({ size = 18, color = "#939393" }) {
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
        d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6 
        0 1.17-.34 2.26-.93 3.17l1.46 1.46C19.29 
        16.33 20 14.74 20 13c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}
