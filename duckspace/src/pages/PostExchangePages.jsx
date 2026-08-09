import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoClose, IoAdd, IoCheckmark } from 'react-icons/io5';

export default function PostExchangePages() {
  const navigate = useNavigate();

  // 현재 입력 단계 (1: 기본 정보, 2: 교환 품목, 3: 교환 정보, 4: 등록 완료)
  const [step, setStep] = useState(1);

  // --- Step 1 상태 (기본 정보) ---
  const [exchangeType, setExchangeType] = useState('direct'); // 'direct' | 'delivery'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // --- Step 2 상태 (내가 가진 굿즈) ---
  const [goodsImages, setGoodsImages] = useState([]);
  const [goodsName, setGoodsName] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState(''); // '미개봉' | '개봉(사용감 적음)' | '사용감 있음'

  // --- Step 3 상태 (원하는 굿즈) ---
  const [wantGoodsImages, setWantGoodsImages] = useState([]);
  const [wantGoodsName, setWantGoodsName] = useState('');
  const [wantBrand, setWantBrand] = useState('');
  const [extraCondition, setExtraCondition] = useState('');

  // 유효성 검사
  const isValidStep1 = title.trim().length > 0;
  const isValidStep2 = goodsName.trim().length > 0;
  const isValidStep3 = wantGoodsName.trim().length > 0;

  // Step 2 이미지 업로드
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (goodsImages.length + files.length > 4) {
      alert('사진은 최대 4장까지 등록할 수 있습니다.');
      return;
    }
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setGoodsImages((prev) => [...prev, ...newImageUrls]);
  };

  const handleRemoveImage = (index) => {
    setGoodsImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Step 3 이미지 업로드
  const handleWantImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (wantGoodsImages.length + files.length > 4) {
      alert('사진은 최대 4장까지 등록할 수 있습니다.');
      return;
    }
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setWantGoodsImages((prev) => [...prev, ...newImageUrls]);
  };

  const handleWantRemoveImage = (index) => {
    setWantGoodsImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 최종 등록 제출
  const handleSubmit = () => {
    if (!isValidStep3) return;
    // 백엔드 API 연동 위치
    console.log('최종 등록 데이터:', {
      exchangeType,
      title,
      content,
      goodsImages,
      goodsName,
      brand,
      condition,
      wantGoodsImages,
      wantGoodsName,
      wantBrand,
      extraCondition,
    });
    // 완료 화면(4단계)으로 이동
    setStep(4);
  };

  // ================= STEP 4: 교환 글 등록 완료 화면 =================
  if (step === 4) {
    return (
      <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative border-x border-gray-100">
        {/* 상단 헤더 */}
        <header className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-gray-800 p-1 -ml-1 focus:outline-none"
            aria-label="뒤로가기"
          >
            <IoChevronBack />
          </button>
          <h1 className="text-base font-bold text-gray-900">완료</h1>
          <div className="w-8" />
        </header>

        {/* 중앙 완료 아이콘 및 텍스트 */}
        <main className="flex-1 flex flex-col items-center justify-center px-5 pb-20">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl mb-6 shadow-lg shadow-blue-100">
            <IoCheckmark />
          </div>
          <h2 className="text-xl font-bold text-gray-900">교환 글 등록 완료</h2>
        </main>

        {/* 하단 버튼 2개 */}
        <footer className="p-5 bg-white space-y-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-3.5 rounded-2xl border border-blue-400 text-blue-500 font-semibold text-sm hover:bg-blue-50 transition-all"
          >
            글 보러가기
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-md shadow-blue-100"
          >
            덕톡 라운지로
          </button>
        </footer>
      </div>
    );
  }

  // ================= STEP 1 ~ 3: 작성 폼 화면 =================
  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative border-x border-gray-100">
      {/* ------------------- 상단 헤더 ------------------- */}
      <header className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button
          onClick={() => {
            if (step > 1) {
              setStep((prev) => prev - 1);
            } else {
              navigate(-1);
            }
          }}
          className="text-2xl text-gray-800 p-1 -ml-1 focus:outline-none"
          aria-label="뒤로가기"
        >
          <IoChevronBack />
        </button>
        <h1 className="text-base font-bold text-gray-900">교환 글 작성</h1>
        <div className="w-8" />
      </header>

      {/* ------------------- 스텝 표시 인디케이터 ------------------- */}
      <div className="flex justify-center items-center gap-6 py-5 border-b border-gray-50">
        {[
          { num: 1, label: '기본 정보' },
          { num: 2, label: '교환 품목' },
          { num: 3, label: '교환 정보' },
        ].map((item) => (
          <div key={item.num} className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === item.num
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {item.num}
            </div>
            <span
              className={`text-xs ${
                step === item.num ? 'text-blue-500 font-bold' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* ------------------- 메인 폼 영역 ------------------- */}
      <main className="flex-1 px-5 py-6 overflow-y-auto">
        {/* ================= STEP 1: 기본 정보 ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">교환 방식 선택</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setExchangeType('direct')}
                  className={`py-3.5 rounded-xl text-sm font-medium transition-all ${
                    exchangeType === 'direct'
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-500 font-bold'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  직접 전달
                </button>
                <button
                  type="button"
                  onClick={() => setExchangeType('delivery')}
                  className={`py-3.5 rounded-xl text-sm font-medium transition-all ${
                    exchangeType === 'delivery'
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-500 font-bold'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  택배 교환
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">제목(필수)</label>
              <div className="relative">
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                  placeholder="글을 작성해주세요. (최대 50자)"
                  className="w-full h-28 bg-gray-50 rounded-2xl p-4 text-sm text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
                />
                <span className="absolute bottom-3 right-4 text-xs text-gray-400 select-none">
                  {title.length}/50
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">내용 실행(선택)</label>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={200}
                  placeholder="글을 작성해주세요. (최대 200자)"
                  className="w-full h-36 bg-gray-50 rounded-2xl p-4 text-sm text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
                />
                <span className="absolute bottom-3 right-4 text-xs text-gray-400 select-none">
                  {content.length}/200
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: 교환 품목 ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">내가 가진 굿즈</label>
              <div className="flex gap-3 overflow-x-auto pb-1">
                <input
                  type="file"
                  id="goods-image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {goodsImages.length < 4 && (
                  <label
                    htmlFor="goods-image-upload"
                    className="w-24 h-24 border-2 border-blue-400 rounded-2xl flex items-center justify-center text-blue-500 bg-white cursor-pointer flex-shrink-0 hover:bg-blue-50 transition-colors"
                  >
                    <IoAdd className="text-3xl" />
                  </label>
                )}

                {goodsImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-2xl relative flex-shrink-0 overflow-hidden border border-gray-100 bg-gray-100"
                  >
                    <img
                      src={imgUrl}
                      alt={`굿즈 미리보기 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1.5 right-1.5 bg-gray-800/60 text-white rounded-full p-1 text-xs hover:bg-gray-900"
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">굿즈 이름 (필수)</label>
              <input
                type="text"
                value={goodsName}
                onChange={(e) => setGoodsName(e.target.value)}
                placeholder="굿즈 이름을 입력해주세요."
                className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">브랜드/시리즈 (선택)</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="브랜드나 시리즈를 입력해주세요."
                className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">상태 (선택)</label>
              <div className="grid grid-cols-3 gap-2">
                {['미개봉', '개봉(사용감 적음)', '사용감 있음'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCondition(condition === option ? '' : option)}
                    className={`py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                      condition === option
                        ? 'bg-white text-blue-600 border-2 border-blue-500 font-bold shadow-sm'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: 교환 정보 (원하는 굿즈) ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">내가 원하는 굿즈 (선택)</label>
              <div className="flex gap-3 overflow-x-auto pb-1">
                <input
                  type="file"
                  id="want-goods-image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleWantImageUpload}
                  className="hidden"
                />

                {wantGoodsImages.length < 4 && (
                  <label
                    htmlFor="want-goods-image-upload"
                    className="w-24 h-24 border-2 border-blue-400 rounded-2xl flex items-center justify-center text-blue-500 bg-white cursor-pointer flex-shrink-0 hover:bg-blue-50 transition-colors"
                  >
                    <IoAdd className="text-3xl" />
                  </label>
                )}

                {wantGoodsImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-2xl relative flex-shrink-0 overflow-hidden border border-gray-100 bg-gray-100"
                  >
                    <img
                      src={imgUrl}
                      alt={`원하는 굿즈 미리보기 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleWantRemoveImage(index)}
                      className="absolute top-1.5 right-1.5 bg-gray-800/60 text-white rounded-full p-1 text-xs hover:bg-gray-900"
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">굿즈 이름 (필수)</label>
              <input
                type="text"
                value={wantGoodsName}
                onChange={(e) => setWantGoodsName(e.target.value)}
                placeholder="굿즈 이름을 입력해주세요."
                className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">브랜드/시리즈 (선택)</label>
              <input
                type="text"
                value={wantBrand}
                onChange={(e) => setWantBrand(e.target.value)}
                placeholder="브랜드나 시리즈를 입력해주세요."
                className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">추가 조건 (선택)</label>
              <div className="relative">
                <textarea
                  value={extraCondition}
                  onChange={(e) => setExtraCondition(e.target.value)}
                  maxLength={200}
                  placeholder="글을 작성해주세요. (최대 200자)"
                  className="w-full h-32 bg-gray-50 rounded-2xl p-4 text-sm text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400 border border-transparent focus:bg-white transition-all"
                />
                <span className="absolute bottom-3 right-4 text-xs text-gray-400 select-none">
                  {extraCondition.length}/200
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ------------------- 하단 버튼 영역 ------------------- */}
      <footer className="p-5 bg-white border-t border-gray-50">
        {step === 1 && (
          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!isValidStep1}
            className={`w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-all duration-200 ${
              isValidStep1
                ? 'bg-blue-500 hover:bg-blue-600 active:scale-[0.99] shadow-md shadow-blue-100'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            다음
          </button>
        )}

        {(step === 2 || step === 3) && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="w-1/3 py-3.5 rounded-2xl font-semibold text-sm border border-blue-400 text-blue-500 hover:bg-blue-50 transition-all"
            >
              이전
            </button>
            <button
              type="button"
              onClick={step === 2 ? () => setStep(3) : handleSubmit}
              disabled={step === 2 ? !isValidStep2 : !isValidStep3}
              className={`w-2/3 py-3.5 rounded-2xl text-white font-semibold text-sm transition-all duration-200 ${
                (step === 2 && isValidStep2) || (step === 3 && isValidStep3)
                  ? 'bg-blue-500 hover:bg-blue-600 active:scale-[0.99] shadow-md shadow-blue-100'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              다음
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}