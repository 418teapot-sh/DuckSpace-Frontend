import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoClose, IoAdd } from 'react-icons/io5';

export default function PostExchangePages() {
  const navigate = useNavigate();

  // 1. 상태 관리 (사진, 내 굿즈, 구하는 굿즈, 본문, 해시태그)
  const [images, setImages] = useState([]);
  const [myItem, setMyItem] = useState('');
  const [wantItem, setWantItem] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');

  // 2. 사진 업로드 핸들러 (최대 4장 제한)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) {
      alert('사진은 최대 4장까지 등록할 수 있습니다.');
      return;
    }
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImageUrls]);
  };

  // 3. 사진 삭제 핸들러
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 4. 완료 버튼 활성화 조건 (지닌 굿즈, 구하는 굿즈, 본문이 모두 작성되었을 때)
  const isValid =
    myItem.trim().length > 0 &&
    wantItem.trim().length > 0 &&
    content.trim().length > 0;

  // 5. 제출 핸들러
  const handleSubmit = () => {
    if (!isValid) return;

    console.log('교환 글 제출 데이터:', {
      images,
      myItem,
      wantItem,
      content,
      hashtag,
    });
    alert('교환 글이 성공적으로 작성되었습니다!');
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative border-x border-gray-100">
      {/* ------------------- 상단 헤더 ------------------- */}
      <header className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-gray-800 p-1 -ml-1 focus:outline-none"
          aria-label="뒤로가기"
        >
          <IoChevronBack />
        </button>
        <h1 className="text-base font-bold text-gray-900">교환 글 작성</h1>
        <div className="w-8" />
      </header>

      {/* ------------------- 메인 폼 영역 ------------------- */}
      <main className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
        {/* 📸 사진 첨부 섹션 */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">
            사진 <span className="text-gray-400 font-normal text-xs">(최대 4장)</span>
          </label>

          <div className="flex gap-3 overflow-x-auto pb-1">
            <input
              type="file"
              id="exchange-image-upload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {images.length < 4 && (
              <label
                htmlFor="exchange-image-upload"
                className="w-20 h-20 border border-blue-400 rounded-2xl flex items-center justify-center text-blue-500 bg-white cursor-pointer flex-shrink-0 hover:bg-blue-50 transition-colors"
              >
                <IoAdd className="text-3xl" />
              </label>
            )}

            {images.map((imgUrl, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-2xl relative flex-shrink-0 overflow-hidden border border-gray-100"
              >
                <img
                  src={imgUrl}
                  alt={`미리보기 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-gray-700/70 text-white rounded-full p-0.5 text-xs hover:bg-gray-800"
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 🎁 교환 물품 정보 섹션 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              지닌 굿즈 <span className="text-gray-400 font-normal text-xs">(내가 줄 굿즈)</span>
            </label>
            <input
              type="text"
              value={myItem}
              onChange={(e) => setMyItem(e.target.value)}
              placeholder="예: 치이카와 마스코트 인형"
              className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              구하는 굿즈 <span className="text-gray-400 font-normal text-xs">(내가 받을 굿즈)</span>
            </label>
            <input
              type="text"
              value={wantItem}
              onChange={(e) => setWantItem(e.target.value)}
              placeholder="예: 하치와레 마스코트 인형"
              className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* 📝 상세 설명 작성 영역 */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">
            상세 내용
          </label>
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
              placeholder="교환 희망 장소, 상태 설명 등을 작성해주세요. (최대 500자)"
              className="w-full h-36 bg-gray-50 rounded-2xl p-4 text-sm text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
            />
            <span className="absolute bottom-3 right-4 text-xs text-gray-400 select-none">
              {content.length}/500
            </span>
          </div>
        </div>

        {/* #️⃣ 해시태그 영역 */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">
            해시태그 <span className="text-gray-400 font-normal text-xs">(선택)</span>
          </label>
          <input
            type="text"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            placeholder="# 해시태그를 입력해주세요."
            className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
          />
        </div>
      </main>

      {/* ------------------- 하단 완료 버튼 ------------------- */}
      <footer className="p-5 bg-white">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-all duration-200 ${
            isValid
              ? 'bg-blue-500 hover:bg-blue-600 active:scale-[0.99] shadow-md shadow-blue-100'
              : 'bg-blue-300 cursor-not-allowed'
          }`}
        >
          완료
        </button>
      </footer>
    </div>
  );
}