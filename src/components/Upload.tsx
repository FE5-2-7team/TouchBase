import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import UndoIcon from "../icons/UndoIcon";
import ImgIcon from "../icons/ImgIcon";
import ProfileBlock from "./ProfileBlock";

export default function Upload() {
  const [title, setTitle] = useState("");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ImgInputRef = useRef<HTMLInputElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const ImgClickHandler = () => {
    ImgInputRef.current?.click();
  };

  const UndoHandler = () => {
    setTitle("");
    setIsEmpty(true);
    if (contentRef.current) {
      contentRef.current.innerHTML = "";
    }
  };

  const ImgFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target?.result as string;
        img.style.maxWidth = "100%";
        img.style.marginTop = "10px";
        contentRef.current?.appendChild(img);
        setIsEmpty(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const InputHandler = () => {
    const text = contentRef.current?.innerText.trim() || "";
    setIsEmpty(text === "");
  };

  useEffect(() => {
    InputHandler();
  }, []);
  return (
    <>
      <div className="shadow-md w-full max-w-[1200px] mx-auto rounded-[10px] border border-[#d9d9d9] flex flex-col">
        <div className="p-[24px] flex gap-[25px]">
          {/* 왼쪽 프로필 영역 */}
          <div className="flex-shink-0 self-start">
            <ProfileBlock username="user name" />
          </div>

          {/* 오른쪽 입력 영역 */}
          <div className="flex flex-col w-full">
            {/* 제목 입력 */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해 주세요."
              className="text-[16px] border border-[#d9d9d9] mb-[10px] 
          w-full max-w-[950px] h-[35px] rounded-[10px] px-4 py-1 
          box-border focus:border-[#0033A0] focus:outline-none"
            />

            {/* 내용 입력 */}
            <div className="relative">
              <div
                ref={contentRef}
                contentEditable
                onInput={InputHandler}
                className="text-[16px] border border-[#d9d9d9] mb-[10px] 
      w-full max-w-[950px] min-h-[90px] rounded-[10px] px-4 py-2 
      box-border resize-none focus:border-[#0033a0] 
      focus:outline-none overflow-auto whitespace-pre-wrap"
              />

              {/* placeholder */}
              {isEmpty && (
                <div className="absolute left-4 top-2 text-[#999999] pointer-events-none">
                  내용을 입력해 주세요.
                </div>
              )}

              {/* 아이콘 + Post 버튼 */}
              <div className="absolute bottom-5 left-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={ImgClickHandler}
                  title="이미지 삽입"
                  className="hover:opacity-80"
                >
                  <ImgIcon />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={ImgInputRef}
                  onChange={ImgFileChangeHandler}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={UndoHandler}
                  title="되돌리기"
                  className="hover:opacity-80"
                >
                  <UndoIcon />
                </button>
              </div>
              <div className="absolute bottom-5 right-4 flex items-center gap-2">
                <Button onClick={() => console.log("클릭됨!!!")}>Post</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
