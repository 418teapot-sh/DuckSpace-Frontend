import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

import ExchangeUserPreferenceCard from "../components/duckTalkComponents/ExchangeUserPreferenceCard";
import ExchangeGoodsPair from "../components/duckTalkComponents/ExchangeGoodsPair";
import ExchangeActionComplete from "../components/duckTalkComponents/ExchangeActionComplete";
import { defaultExchangeDetailInfo } from "../data/duckTalkMockData";

function ExchangeDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabType = searchParams.get("tab") || "completed";

  const [actionComplete, setActionComplete] = useState(null);
  const detail = defaultExchangeDetailInfo;

  // 탭별 설정 분기
  const getTabConfig = () => {
    switch (tabType) {
      case "sent":
        return {
          title: "보낸 신청",
          goodsSectionTitle: "교환 신청한 굿즈",
          firstGoods: { ...detail.myGoods, label: "내 굿즈", isMine: true },
          secondGoods: { ...detail.targetGoods, label: "상대방 굿즈", isMine: false },
        };
      case "received":
        return {
          title: "받은 신청",
          goodsSectionTitle: "교환 신청한 굿즈",
          firstGoods: { ...detail.targetGoods, label: "상대방 굿즈", isMine: false },
          secondGoods: { ...detail.myGoods, label: "내 굿즈", isMine: true },
        };
      case "progress":
        return {
          title: "진행중인 교환",
          goodsSectionTitle: "교환 완료 된 굿즈",
          firstGoods: { ...detail.myGoods, label: "내 굿즈", isMine: true },
          secondGoods: { ...detail.targetGoods, label: "상대방 굿즈", isMine: false },
        };
      case "completed":
      default:
        return {
          title: "완료된 교환",
          goodsSectionTitle: "교환 신청한 굿즈",
          firstGoods: { ...detail.targetGoods, label: "상대방 굿즈", isMine: false },
          secondGoods: { ...detail.myGoods, label: "내 굿즈", isMine: true },
        };
    }
  };

  const config = getTabConfig();

  // 완료 뷰 분기 (취소완료 / 거절완료)
  if (actionComplete) {
    return (
      <ExchangeActionComplete
        title={actionComplete === "canceled" ? "교환 신청 취소 완료!" : "교환 신청 거절 완료!"}
        listButtonText="교환목록 보러가기"
        onListClick={() => navigate("/ducktalk/exchange/list")}
        onChatClick={() => navigate("/chat")}
        onClose={() => navigate("/ducktalk/exchange/list")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white pb-36">
      <header className="relative flex h-14 items-center justify-center px-5 border-b border-transparent">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoChevronBack />
        </button>
        <h1 className="text-[18px] font-semibold text-[#171617]">{config.title}</h1>
      </header>

      <main className="flex flex-col gap-3 px-5 pt-3">
        {/* 1. 상대방 정보 카드 */}
        <ExchangeUserPreferenceCard user={detail.user} preferences={detail.preferences} />

        {/* 2. 교환 굿즈 2종 카드 */}
        <ExchangeGoodsPair
          sectionTitle={config.goodsSectionTitle}
          firstGoods={config.firstGoods}
          secondGoods={config.secondGoods}
        />

        {/* 3. 메시지 카드 */}
        <div className="flex flex-col gap-3 rounded-lg bg-white/75 p-5 shadow-[0px_15px_40px_rgba(205.52,205.52,205.52,0.08)] backdrop-blur-[10px]">
          <h2 className="text-[18px] font-semibold leading-[25.2px] text-[#171617]">메세지</h2>
          <div className="w-full rounded-tr-2xl rounded-br-2xl rounded-tl-[20px] bg-[#2F78FD] px-5 py-3 text-center">
            <span className="text-[16px] font-semibold leading-[20.8px] text-[#FCFCFC]">
              {detail.message}
            </span>
          </div>
        </div>
      </main>

      {/* 4. 하단 액션 버튼 */}
      {tabType !== "completed" && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] bg-[#FCFCFC] px-5 py-3 z-30 flex flex-col items-center gap-2">
          {tabType === "received" && (
            <>
              <div className="flex w-full gap-2.5">
                <button
                  type="button"
                  onClick={() => setActionComplete("rejected")}
                  className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#DEDEDE] bg-[#F4F4F4] text-[14px] font-semibold text-[#858485] cursor-pointer"
                >
                  거절하기
                </button>
                <button
                  type="button"
                  className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#A6C3F8] bg-[#FCFCFC] text-[14px] font-semibold text-[#2F78FD] cursor-pointer"
                >
                  수락하기
                </button>
              </div>
              <button
                type="button"
                onClick={() => navigate("/chat")}
                className="text-[16px] text-[#858485] cursor-pointer py-1"
              >
                채팅하기
              </button>
            </>
          )}

          {tabType === "progress" && (
            <div className="flex w-full gap-2">
              <button
                type="button"
                onClick={() => navigate("/chat")}
                className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#A6C3F8] bg-[#FCFCFC] text-[14px] font-semibold text-[#2F78FD] cursor-pointer"
              >
                채팅하기
              </button>
              <button
                type="button"
                className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#2F78FD] bg-[#5791FB] text-[14px] font-semibold text-[#FCFCFC] cursor-pointer shadow-sm hover:bg-[#2F78FD]"
              >
                교환 완료
              </button>
            </div>
          )}

          {tabType === "sent" && (
            <>
              <button
                type="button"
                onClick={() => setActionComplete("canceled")}
                className="flex h-12 w-full items-center justify-center rounded-lg border border-[#DEDEDE] bg-[#F4F4F4] text-[14px] font-semibold text-[#858485] cursor-pointer"
              >
                취소하기
              </button>
              <button
                type="button"
                onClick={() => navigate("/chat")}
                className="text-[16px] text-[#858485] cursor-pointer py-1"
              >
                채팅하기
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ExchangeDetail;