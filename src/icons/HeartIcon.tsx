export default function HeartIcon({ size = 18, color = "#939393" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
        2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04 1 3.57 
        2.36h1.87C13.46 6 14.96 5 16.5 5 18.5 5 20 6.5 
        20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}
