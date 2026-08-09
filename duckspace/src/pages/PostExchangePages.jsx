import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

export default function PostExchangePages() {
  const navigate = useNavigate();

  // 현재 입력 단계 (1단계: 기본 정보)
  const [step, setStep] = useState(1);

  // 1단계 입력 상태 (교환 방식, 제목, 내용)
  const [exchangeType, setExchangeType] = useState('direct'); // 'direct' | 'delivery'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 1단계 필수 입력 조건 (제목 작성 시 다음 단계 활성화)
  const isValidStep1 = title.trim().length > 0;

  const handleNext = () => {
    if (step === 1 && isValidStep1) {
      // 다음 단계로 이동 (추후 2단계, 3단계 확장)
      alert('2단계(교환 품목)로 이동합니다!');
    }
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

      {/* ------------------- 스텝 표시 인디케이터 ------------------- */}
      <div className="flex justify-center items-center gap-6 py-5 border-b border-gray-50">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            1
          </div>
          <span className={`text-xs ${step === 1 ? 'text-blue-500 font-bold' : 'text-gray-400'}`}>
            기본 정보
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            2
          </div>
          <span className={`text-xs ${step === 2 ? 'text-blue-500 font-bold' : 'text-gray-400'}`}>
            교환 품목
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            3
          </div>
          <span className={`text-xs ${step === 3 ? 'text-blue-500 font-bold' : 'text-gray-400'}`}>
            교환 정보
          </span>
        </div>
      </div>

      {/* ------------------- 메인 폼 영역 ------------------- */}
      <main className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
        {/* 교환 방식 선택 */}
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

        {/* 제목 (필수) */}
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

        {/* 내용 설명 (선택) */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">내용 설명(선택)</label>
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
      </main>

      {/* ------------------- 하단 다음 버튼 ------------------- */}
      <footer className="p-5 bg-white">
        <button
          type="button"
          onClick={handleNext}
          disabled={!isValidStep1}
          className={`w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-all duration-200 ${
            isValidStep1
              ? 'bg-blue-500 hover:bg-blue-600 active:scale-[0.99] shadow-md shadow-blue-100'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          다음
        </button>
      </footer>
    </div>
  );
}