type SendButtonProps = {
  onClick: () => void;
};
export default function SendButton({ onClick }: SendButtonProps) {
  const buttonStyle =
    "justify-end bg-[#0033A0] border hover:bg-[#fff] hover:border-1 hover:text-[#0033A0] text-white rounded-[10px] px-7 mb-2 py-2 text-sm cursor-pointer dark:hover:bg-white dark:border-[#0033A0] dark:hover:border-[#0033A0] dark:hover:text-[#0033A0]";

  return (
    <>
      <div className="absolute right-10 mt-10">
        <button className={buttonStyle} onClick={onClick}>
          보내기
        </button>
      </div>
    </>
  );
}
