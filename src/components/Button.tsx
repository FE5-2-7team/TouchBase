interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
export default function Button({ children, onClick }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="text-[16px] w-[90px] h-[35px] bg-[#0033A0] text-white rounded-[10px] flex items-center justify-center
         hover:bg-[#ffffff] hover:border-1 hover:border-[#0033A0] hover:text-[#0033A0] transition"
      >
        {children}
      </button>
    </>
  );
}
