import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoClose,
  IoCheckmarkCircle,
  IoCheckmark,
  IoAdd,
} from "react-icons/io5";

import displayBack from "../assets/displaybackgrounds/display_back.png";

function ExchangeApply() {
  const navigate = useNavigate();

  // 1. 신청 완료 화면 여부 ('form' | 'complete')
  const [isCompleted, setIsCompleted] = useState(false);

  // 2. 굿즈 선택 방식 ('direct' | 'myPost')
  const [goodsSource, setGoodsSource] = useState("direct");

  // 3. 입력 폼 상태
  const [goodsImage, setGoodsImage] = useState(null);
  const [goodsName, setGoodsName] = useState("");
  const [brandSeries, setBrandSeries] = useState("");
  const [status, setStatus] = useState("미개봉"); // '미개봉' | '사용감 적음' | '사용감 있음'
  const [message, setMessage] = useState("");

  // 이미지 업로드 핸들러
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGoodsImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // 신청하기 버튼 활성화 조건 (직접입력: 사진+이름 필수 / 교환글 선택: 바로 가능)
  const isSubmitValid =
    goodsSource === "myPost" || (goodsImage !== null && goodsName.trim() !== "");

  // ===================== [완료 화면 뷰] =====================
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between pb-10">
        {/* 상단 헤더 */}
        <header className="relative flex h-14 items-center justify-center px-5 border-b border-transparent">
          <h1 className="text-[18px] font-semibold text-[#171617]">완료</h1>
          <button
            type="button"
            onClick={() => navigate("/ducktalk")}
            className="absolute right-5 cursor-pointer text-2xl text-[#171617]"
            aria-label="닫기"
          >
            <IoClose />
          </button>
        </header>

        {/* 중앙 안내 문구 & 체크 아이콘 */}
        <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#2F78FD]">
            <IoCheckmark size={44} className="text-white" />
          </div>
          <h2 className="text-[22px] font-bold leading-tight text-[#171617] mb-2">
            교환 신청 완료!
          </h2>
          <p className="text-[18px] font-normal leading-[25.2px] text-[#858485]">
            답변이 올 때까지 기다려주세요.
          </p>
        </div>

        {/* 하단 버튼 2종 */}
        <div className="flex flex-col gap-2.5 px-5">
          <button
            type="button"
            onClick={() => navigate("/ducktalk/mypage")}
            className="flex h-12 w-full items-center justify-center rounded-lg border border-[#A6C3F8] bg-[#FCFCFC] text-[14px] font-semibold text-[#2F78FD] cursor-pointer"
          >
            교환 신청 목록 보러가기
          </button>
          <button
            type="button"
            onClick={() => navigate("/chat")}
            className="flex h-12 w-full items-center justify-center rounded-lg border border-[#2F78FD] bg-[#5791FB] text-[14px] font-semibold text-[#FCFCFC] cursor-pointer shadow-sm hover:bg-[#2F78FD] transition-all"
          >
            채팅하기
          </button>
        </div>
      </div>
    );
  }

  // ===================== [교환 신청서 작성 폼] =====================
  return (
    <div className="min-h-screen bg-white pb-28">
      {/* 1. 상단 헤더 */}
      <header className="relative flex h-14 items-center justify-center px-5 border-b border-transparent">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
          aria-label="뒤로가기"
        >
          <IoChevronBack />
        </button>

        <h1 className="text-[18px] font-semibold text-[#171617]">교환 신청</h1>
      </header>

      <main className="flex flex-col gap-5 px-5 pt-3">
        {/* 2. 상대방 정보 및 선호도 카드 */}
        <div className="flex flex-col gap-3 rounded-lg border border-white/60 bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[#858485] overflow-hidden" />
              <span className="text-[18px] font-semibold text-[#171617]">
                다른 사람
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#2F78FD]">
              <IoCheckmarkCircle size={20} />
              <span className="text-[16px] font-semibold">신뢰도 98</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#EEEEEE]/60 text-[14px]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#171617]">선호하는 팝업</span>
              <span className="font-semibold text-[#2F78FD]"># 치이카와 스시 팝업</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#171617]">선호하는 날짜</span>
              <span className="font-semibold text-[#2F78FD]"># 260809</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#171617]">선호하는 시간</span>
              <span className="font-semibold text-[#2F78FD]"># 12시부터14시까지</span>
            </div>
          </div>
        </div>

        {/* 3. 내가 보내는 굿즈 섹션 */}
        <div className="flex flex-col gap-3 rounded-lg border border-white/60 bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
          <h2 className="text-[18px] font-semibold text-[#171617]">내가 보내는 굿즈</h2>

          {/* 탭: 직접입력 vs 내 교환글에서 고르기 */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setGoodsSource("direct")}
              className={`flex-1 h-12 rounded-lg text-[14px] font-semibold cursor-pointer transition-all ${
                goodsSource === "direct"
                  ? "bg-[#FCFCFC] border border-[#A6C3F8] text-[#2F78FD]"
                  : "bg-[#F4F4F4] border border-[#DEDEDE] text-[#858485]"
              }`}
            >
              직접입력
            </button>
            <button
              type="button"
              onClick={() => setGoodsSource("myPost")}
              className={`flex-1 h-12 rounded-lg text-[14px] font-semibold cursor-pointer transition-all ${
                goodsSource === "myPost"
                  ? "bg-[#FCFCFC] border border-[#A6C3F8] text-[#2F78FD]"
                  : "bg-[#F4F4F4] border border-[#DEDEDE] text-[#858485]"
              }`}
            >
              내 교환글에서 고르기
            </button>
          </div>

          {/* 직접 입력 폼 */}
          {goodsSource === "direct" ? (
            <div className="flex flex-col gap-4 pt-2">
              {/* 내 굿즈 사진(필수) */}
              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold text-[#171617]">
                  내 굿즈 사진(필수)
                </span>
                <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-[#2F78FD] bg-[#FCFCFC] overflow-hidden">
                  {goodsImage ? (
                    <img
                      src={goodsImage}
                      alt="내 굿즈"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <IoAdd size={36} className="text-[#2F78FD]" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* 굿즈 이름 (필수) */}
              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold text-[#171617]">
                  굿즈 이름 (필수)
                </span>
                <div className="flex items-center gap-1 rounded-lg border border-[#EEEEEE] bg-[#FCFCFC] px-3 py-3">
                  <span
                    className={`text-[14px] ${
                      goodsName ? "text-[#2F78FD]" : "text-[#545454]"
                    }`}
                  >
                    #
                  </span>
                  <input
                    type="text"
                    value={goodsName}
                    onChange={(e) => setGoodsName(e.target.value)}
                    placeholder="이름을 작성해주세요."
                    className={`w-full bg-transparent text-[14px] outline-none ${
                      goodsName ? "text-[#2F78FD]" : "text-[#171617] placeholder:text-[#A2A2A2]"
                    }`}
                  />
                </div>
              </div>

              {/* 브랜드/시리즈 (선택) */}
              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold text-[#171617]">
                  브랜드/시리즈 (선택)
                </span>
                <div className="flex items-center gap-1 rounded-lg border border-[#EEEEEE] bg-[#FCFCFC] px-3 py-3">
                  <span
                    className={`text-[14px] ${
                      brandSeries ? "text-[#2F78FD]" : "text-[#545454]"
                    }`}
                  >
                    #
                  </span>
                  <input
                    type="text"
                    value={brandSeries}
                    onChange={(e) => setBrandSeries(e.target.value)}
                    placeholder="이름을 작성해주세요."
                    className={`w-full bg-transparent text-[14px] outline-none ${
                      brandSeries ? "text-[#2F78FD]" : "text-[#171617] placeholder:text-[#A2A2A2]"
                    }`}
                  />
                </div>
              </div>

              {/* 상태 (선택) */}
              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold text-[#171617]">
                  상태 (선택)
                </span>
                <div className="flex gap-2">
                  {["미개봉", "사용감 적음", "사용감 있음"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStatus(item)}
                      className={`flex-1 h-12 rounded-lg text-[14px] font-semibold cursor-pointer transition-all ${
                        status === item
                          ? "bg-[#FCFCFC] border border-[#A6C3F8] text-[#2F78FD]"
                          : "bg-[#F4F4F4] border border-[#DEDEDE] text-[#858485]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* 내 교환글에서 고른 굿즈 카드 */
            <div className="flex items-center gap-6 rounded-lg border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-[10px]">
              <div className="h-[124px] w-[124px] shrink-0 overflow-hidden rounded-lg border border-[#DEDEDE]">
                <img
                  src={displayBack}
                  alt="치이카와 키링"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-semibold text-[#171617]">치이카와 키링</h3>
                <p className="text-[16px] text-[#A2A2A2]">미개봉</p>
              </div>
            </div>
          )}
        </div>

        {/* 4. 내가 원하는 굿즈 섹션 */}
        <div className="flex flex-col gap-3 rounded-lg border border-white/60 bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
          <h2 className="text-[18px] font-semibold text-[#171617]">내가 원하는 굿즈</h2>
          <div className="flex items-center gap-6 rounded-lg border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-[10px]">
            <div className="h-[124px] w-[124px] shrink-0 overflow-hidden rounded-lg border border-[#DEDEDE]">
              <img
                src={displayBack}
                alt="우사기 키링"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] font-semibold text-[#171617]">우사기 키링</h3>
              <p className="text-[16px] text-[#A2A2A2]">사용감 있음</p>
            </div>
          </div>
        </div>

        {/* 5. 메세지 (선택) 섹션 */}
        <div className="flex flex-col gap-3 rounded-lg border border-white/60 bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
          <h2 className="text-[18px] font-semibold text-[#171617]">메세지 (선택)</h2>
          <div className="flex flex-col items-end gap-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 200))}
              placeholder="글을 작성해주세요. (최대 200자)"
              className="h-28 w-full rounded-lg border border-[#EEEEEE] bg-[#FCFCFC] p-3 text-[14px] outline-none resize-none placeholder:text-[#A2A2A2]"
            />
            <span className="text-[14px] text-[#A2A2A2]">{message.length}/200</span>
          </div>
        </div>
      </main>

      {/* 6. 하단 고정 신청하기 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/90 p-5 backdrop-blur-md z-30">
        <button
          type="button"
          disabled={!isSubmitValid}
          onClick={() => setIsCompleted(true)}
          className={`flex h-12 w-full items-center justify-center rounded-lg text-[14px] font-semibold transition-all ${
            isSubmitValid
              ? "bg-[#5791FB] border border-[#2F78FD] text-[#FCFCFC] cursor-pointer shadow-md hover:bg-[#2F78FD]"
              : "bg-[#F4F4F4] border border-[#DEDEDE] text-[#858485] cursor-not-allowed"
          }`}
        >
          신청하기
        </button>
      </div>
    </div>
  );
}

export default ExchangeApply;