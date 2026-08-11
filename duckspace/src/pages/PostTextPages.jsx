import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MAX_IMAGES = 4;
const MAX_LENGTH = 500;

export default function PostTextPages() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [hashtag, setHashtag] = useState("");

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setImages((prev) => {
      const remaining = MAX_IMAGES - prev.length;
      const next = files.slice(0, remaining).map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        url: URL.createObjectURL(file),
      }));
      return [...prev, ...next];
    });

    e.target.value = "";
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => {
      const target = prev.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((image) => image.id !== id);
    });
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("글을 작성해주세요.");
      return;
    }
    alert("잡담 글이 작성되었습니다!");
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 sm:py-8">
      {/* 피그마 프레임 규격: 402px, 배경 #FCFCFC */}
      <div className="flex w-full max-w-[402px] flex-col justify-between bg-white sm:min-h-[874px] sm:rounded-3xl sm:shadow-xl border border-gray-100 overflow-hidden">
        
        <div>
          {/* 1. 상단 헤더 (높이 60px, 폰트 18px 600 #171617) */}
          <header className="flex h-[60px] items-center justify-between px-5 bg-white">
            <button
              type="button"
              aria-label="뒤로 가기"
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-[#171617] hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h1 className="text-[18px] font-semibold text-[#171617]">잡담 글 작성</h1>
            <div className="w-6" />
          </header>

          {/* 2. 메인 입력 영역 (패딩 20px, 요소 간격 20px) */}
          <main className="p-[20px] space-y-[20px]">
            
            {/* 📸 사진 섹션 */}
            <section className="space-y-[8px]">
              <div className="flex items-center gap-[10px] h-[25px]">
                <span className="text-[18px] font-semibold text-[#171617]">사진</span>
                <span className="text-[16px] font-normal text-[#A2A2A2]">(최대4장)</span>
              </div>

              {/* 사진 리스트 (피그마 지정 160px × 160px 카드) */}
              <div className="flex items-center gap-[12px] overflow-x-auto pb-1">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative w-[160px] h-[160px] shrink-0 rounded-[8px] bg-[#DEDEDE] overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt="첨부 이미지"
                      className="h-full w-full object-cover"
                    />
                    {/* 이미지 삭제 버블 버튼 (피그마 좌표 계산 적용) */}
                    <button
                      type="button"
                      aria-label="이미지 삭제"
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute right-[8px] top-[8px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#171617]/30 text-[#FCFCFC] hover:bg-[#171617]/60 transition-colors"
                    >
                      <svg width="10.5" height="10.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* + 사진 추가 버튼 (160px × 160px, 테두리 #2F78FD, 배경 #FCFCFC) */}
                {images.length < MAX_IMAGES && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="사진 추가"
                    className="flex w-[160px] h-[160px] shrink-0 items-center justify-center rounded-[8px] border border-[#2F78FD] bg-[#FCFCFC] hover:bg-blue-50/30 transition-colors"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M20 8V32M8 20H32" stroke="#2F78FD" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAddImages}
                />
              </div>
            </section>

            {/* 📝 글 작성 섹션 */}
            <section className="space-y-[8px]">
              <div className="flex items-center gap-[10px] h-[25px]">
                <span className="text-[18px] font-semibold text-[#171617]">글 작성</span>
              </div>
              <div className="flex flex-col items-end gap-[4px]">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
                  placeholder="글을 작성해주세요. (최대 500자)"
                  className="w-full h-[112px] resize-none rounded-[8px] bg-[#FCFCFC] p-[12px] text-[14px] text-[#171617] placeholder:text-[#A2A2A2] border border-[#EEEEEE] focus:border-[#2F78FD] focus:outline-none transition-all"
                />
                <span className="text-[14px] text-[#A2A2A2]">
                  {content.length}/{MAX_LENGTH}
                </span>
              </div>
            </section>

            {/* #️⃣ 해시태그 섹션 */}
            <section className="space-y-[8px]">
              <div className="flex items-center gap-[10px] h-[25px]">
                <span className="text-[18px] font-semibold text-[#171617]">해시태그 (선택)</span>
              </div>
              <input
                type="text"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                placeholder="# 해시태그를 입력해주세요."
                className="w-full rounded-[8px] bg-[#FCFCFC] p-[12px] text-[14px] text-[#171617] placeholder:text-[#A2A2A2] border border-[#EEEEEE] focus:border-[#2F78FD] focus:outline-none transition-all"
              />
            </section>
          </main>
        </div>

        {/* 3. 하단 완료 버튼 (높이 48px, 패딩 20px, #2F78FD) */}
        <footer className="p-[20px] bg-white">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!content.trim()}
            className={`w-full h-[48px] rounded-[8px] text-[14px] font-semibold text-[#FCFCFC] transition-all duration-200 ${
              content.trim()
                ? "bg-[#2F78FD] hover:bg-blue-600 active:scale-[0.99] shadow-md shadow-blue-100"
                : "bg-[#5791FB] opacity-80 cursor-not-allowed border border-[#2F78FD]"
            }`}
          >
            완료
          </button>
        </footer>

      </div>
    </div>
  );
}