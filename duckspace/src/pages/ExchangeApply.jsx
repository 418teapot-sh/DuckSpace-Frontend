import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoAdd } from "react-icons/io5";

import ExchangeUserPreferenceCard from "../components/duckTalkComponents/ExchangeUserPreferenceCard";
import ExchangeActionComplete from "../components/duckTalkComponents/ExchangeActionComplete";
import { defaultExchangeDetailInfo } from "../data/duckTalkMockData";

function ExchangeApply() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [goodsSource, setGoodsSource] = useState("direct");

  const [goodsImage, setGoodsImage] = useState(null);
  const [goodsName, setGoodsName] = useState("");
  const [brandSeries, setBrandSeries] = useState("");
  const [status, setStatus] = useState("미개봉");
  const [message, setMessage] = useState("");

  const detail = defaultExchangeDetailInfo;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGoodsImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const isSubmitValid =
    goodsSource === "myPost" || (goodsImage !== null && goodsName.trim() !== "");

  if (isCompleted) {
    return (
      <ExchangeActionComplete
        title="교환 신청 완료!"
        description="답변이 올 때까지 기다려주세요."
        listButtonText="교환 신청 목록 보러가기"
        onListClick={() => navigate("/ducktalk/mypage")}
        onChatClick={() => navigate("/chat")}
        onClose={() => navigate("/ducktalk")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white pb-28">
      <header className="relative flex h-14 items-center justify-center px-5 border-b border-transparent">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoChevronBack />
        </button>
        <h1 className="text-[18px] font-semibold text-[#171617]">교환 신청</h1>
      </header>

      <main className="flex flex-col gap-5 px-5 pt-3">
        {/* 1. 상대방 정보 카드 */}
        <ExchangeUserPreferenceCard user={detail.user} preferences={detail.preferences} />

        {/* 2. 내가 보내는 굿즈 */}
        <div className="flex flex-col gap-3 rounded-lg border border-white/60 bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
          <h2 className="text-[18px] font-semibold text-[#171617]">내가 보내는 굿즈</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setGoodsSource("direct")}
              className={`flex-1 h-12 rounded-lg text-[14px] font-semibold cursor-pointer ${
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
              className={`flex-1 h-12 rounded-lg text-[14px] font-semibold cursor-pointer ${
                goodsSource === "myPost"
                  ? "bg-[#FCFCFC] border border-[#A6C3F8] text-[#2F78FD]"
                  : "bg-[#F4F4F4] border border-[#DEDEDE] text-[#858485]"
              }`}
            >
              내 교환글에서 고르기
            </button>
          </div>

          {goodsSource === "direct" ? (
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold text-[#171617]">내 굿즈 사진(필수)</span>
                <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-[#2F78FD] bg-[#FCFCFC] overflow-hidden">
                  {goodsImage ? (
                    <img src={goodsImage} alt="내 굿즈" className="h-full w-full object-cover" />
                  ) : (
                    <IoAdd size={36} className="text-[#2F78FD]" />
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold text-[#171617]">굿즈 이름 (필수)</span>
                <div className="flex items-center gap-1 rounded-lg border border-[#EEEEEE] bg-[#FCFCFC] px-3 py-3">
                  <span className={`text-[14px] ${goodsName ? "text-[#2F78FD]" : "text-[#545454]"}`}>#</span>
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

              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold text-[#171617]">브랜드/시리즈 (선택)</span>
                <div className="flex items-center gap-1 rounded-lg border border-[#EEEEEE] bg-[#FCFCFC] px-3 py-3">
                  <span className={`text-[14px] ${brandSeries ? "text-[#2F78FD]" : "text-[#545454]"}`}>#</span>
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

              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold text-[#171617]">상태 (선택)</span>
                <div className="flex gap-2">
                  {["미개봉", "사용감 적음", "사용감 있음"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStatus(item)}
                      className={`flex-1 h-12 rounded-lg text-[14px] font-semibold cursor-pointer ${
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
            <div className="flex items-center gap-6 rounded-lg border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-[10px]">
              <img src={detail.myGoods.image} alt={detail.myGoods.title} className="h-[124px] w-[124px] shrink-0 rounded-lg border border-[#DEDEDE] object-cover" />
              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-semibold text-[#171617]">{detail.myGoods.title}</h3>
                <p className="text-[16px] text-[#A2A2A2]">{detail.myGoods.status}</p>
              </div>
            </div>
          )}
        </div>

        {/* 3. 내가 원하는 굿즈 */}
        <div className="flex flex-col gap-3 rounded-lg border border-white/60 bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
          <h2 className="text-[18px] font-semibold text-[#171617]">내가 원하는 굿즈</h2>
          <div className="flex items-center gap-6 rounded-lg border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-[10px]">
            <img src={detail.targetGoods.image} alt={detail.targetGoods.title} className="h-[124px] w-[124px] shrink-0 rounded-lg border border-[#DEDEDE] object-cover" />
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] font-semibold text-[#171617]">{detail.targetGoods.title}</h3>
              <p className="text-[16px] text-[#A2A2A2]">{detail.targetGoods.status}</p>
            </div>
          </div>
        </div>

        {/* 4. 메시지 (선택) */}
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

      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/90 p-5 backdrop-blur-md z-30">
        <button
          type="button"
          disabled={!isSubmitValid}
          onClick={() => setIsCompleted(true)}
          className={`flex h-12 w-full items-center justify-center rounded-lg text-[14px] font-semibold ${
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