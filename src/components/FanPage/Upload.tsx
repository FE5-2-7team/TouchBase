import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { LuImagePlus } from "react-icons/lu";
import ProfileBlock from "./ProfileBlock";
import { MdOutlineReplay } from "react-icons/md";

interface UploadProps {
  titleValue?: string;
  contentValue?: string;
  imageList?: string[];
  editFinishHandler?: () => void;
}

export default function Upload({ titleValue, contentValue, imageList, editFinishHandler }: UploadProps) {
  const [title, setTitle] = useState(titleValue || "");
  const [images, setImages] = useState<string[]>(imageList || []);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ImgInputRef = useRef<HTMLInputElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const ImgClickHandler = () => {
    ImgInputRef.current?.click();
  };

  const UndoHandler = () => {
    setTitle("");
    setIsEmpty(true);
    setImages([]);
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
        const result = e.target?.result as string
        img.src = result;
        img.style.maxWidth = "100%";
        img.style.marginTop = "10px";
        contentRef.current?.appendChild(img);
        setImages((prev) => [...prev, result]);
        setIsEmpty(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const InputHandler = () => {
    const text = contentRef.current?.innerText.trim() || "";
    setIsEmpty(text === "");
  };

  const postHandler = () => {
    editFinishHandler?.();
  }

  useEffect(() => {
    const contentHTML = contentValue || "";
  
    const imageHTML =
      imageList && imageList.length > 0
        ? imageList
            .map(
              (src) =>
                `<img src="${src}" style="max-width:100%; margin-top:10px;" />`
            )
            .join("")
        : "";
  
    if (contentRef.current) {
      contentRef.current.innerHTML = contentHTML + imageHTML;
    }
  
    setImages(imageList || []);
    InputHandler();
  }, [contentValue, imageList]);

  return (
    <>
      <div className="shadow-md w-full max-w-full md:max-w-[1200px] mx-auto rounded-[10px] border border-[#d9d9d9] flex flex-col">
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
          w-full md:max-w-[950px] h-[35px] rounded-[10px] px-4 py-1 
          box-border focus:border-[#0033A0] focus:outline-none"
            />

            {/* 내용 입력 */}
            <div className="relative">
              <div
                ref={contentRef}
                contentEditable
                onInput={InputHandler}
                className="text-[16px] border border-[#d9d9d9] mb-[10px] 
      w-full md:max-w-[950px] min-h-[90px] rounded-[10px] px-4 py-2 
      box-border resize-none focus:border-[#0033a0] 
      focus:outline-none overflow-auto whitespace-pre-wrap pb-[60px]"
              />

              {/* placeholder */}
              {isEmpty && (
                <div className="absolute left-4 top-2 text-[#999999] pointer-events-none">
                  내용을 입력해 주세요.
                </div>
              )}

              {/* 아이콘 + POST 버튼 */}
              <div className="absolute md:max-w-[950px] left-0 right-0  bottom-5 gap-4 px-4 md:px-4 flex items-center justify-between">
                {/* 왼쪽 아이콘들 */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={ImgClickHandler}
                    title="이미지 삽입"
                    className="hover:opacity-80 transition-transform duration-200 hover:scale-105"
                  >
                    <LuImagePlus className="text-[18px] text-[#ababab]" />
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
                    className="hover:opacity-80 transition-transform duration-200 hover:scale-105"
                  >
                    <MdOutlineReplay className="text-[18px] text-[#ababab]" />
                  </button>
                </div>

                {/* 오른쪽 POST 버튼 */}
                <div className="flex items-center gap-2">
                  <Button onClick={postHandler}>POST</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
