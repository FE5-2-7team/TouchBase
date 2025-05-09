import { MessageMode, Sender } from "../../types/messageType";
import { useNavigate } from "react-router";

type SendButtonProps = {
  mode: MessageMode;
  sender?: Sender;
  onClick: () => void;
};
export default function SendButton({ mode, sender, onClick }: SendButtonProps) {
  const buttonStyle =
    "justify-end bg-[#0033A0] border hover:bg-[#fff] hover:border-1 hover:text-[#0033A0] text-white rounded-[10px] px-7 mb-2 py-2 text-sm cursor-pointer dark:hover:bg-white dark:border-[#0033A0] dark:hover:border-[#0033A0] dark:hover:text-[#0033A0]";
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-end mb-6 mr-2 px-3">
        {mode === "write" ? (
          <button className={buttonStyle} onClick={onClick}>
            보내기
          </button>
        ) : mode === "reply" ? (
          <button className={buttonStyle} onClick={() => navigate(`/message/write/${sender?._id}`)}>
            답장하기
          </button>
        ) : null}
      </div>
    </>
  );
}
