import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoSwapHorizontal, IoChevronForward } from "react-icons/io5";

function ExchangeListCard({ item, activeTab }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#F4F4F4] bg-white/75 p-4 sm:p-5 shadow-[0px_15px_40px_rgba(205.52,205.52,205.52,0.08)] backdrop-blur-[10px]">
      {/* 1. 상대방 프로필 정보 */}
      <div className="flex items-center justify-between rounded-lg border border-[#F4F4F4] px-5 py-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#858485]" />
          <span className="text-[16px] font-semibold leading-[20.8px] text-[#171617]">
            {item.user.name}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#2F78FD]">
          <IoCheckmarkCircle size={18} />
          <span className="text-[14px] font-semibold leading-[21px]">
            신뢰도 {item.user.score}
          </span>
        </div>
      </div>

      {/* 2. 교환 굿즈 대조 */}
      <div className="flex items-center justify-between px-2">
        <div className="w-[124px] text-center text-[16px] font-semibold leading-[20.8px] text-[#171617]">
          {item.myGoods}
        </div>
        <IoSwapHorizontal size={22} className="text-black shrink-0" />
        <div className="w-[124px] text-center text-[16px] font-semibold leading-[20.8px] text-[#171617]">
          {item.targetGoods}
        </div>
      </div>

      {/* 3. 탭별 액션 버튼 분기 */}
      {activeTab === "sent" && (
        <div className="flex gap-3">
          {item.status === "pending" ? (
            <>
              <button
                type="button"
                className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#DEDEDE] bg-[#F4F4F4] text-[14px] font-semibold text-[#858485] cursor-pointer"
              >
                취소하기
              </button>
              <button
                type="button"
                onClick={() => navigate("/chat")}
                className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#A6C3F8] bg-[#FCFCFC] text-[14px] font-semibold text-[#2F78FD] cursor-pointer"
              >
                채팅하기
              </button>
            </>
          ) : (
            <div className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#A2A2A2] bg-[#DEDEDE] text-[14px] font-semibold text-[#A2A2A2]">
              취소완료
            </div>
          )}
        </div>
      )}

      {activeTab === "received" && (
        <div className="flex gap-3">
          {item.status === "pending" ? (
            <>
              <button
                type="button"
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
            </>
          ) : (
            <div className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#A2A2A2] bg-[#DEDEDE] text-[14px] font-semibold text-[#A2A2A2]">
              거절완료
            </div>
          )}
        </div>
      )}

      {activeTab === "progress" && (
        <button
          type="button"
          onClick={() => navigate("/chat")}
          className="flex h-12 w-full items-center justify-center rounded-lg border border-[#2F78FD] bg-[#5791FB] text-[14px] font-semibold text-[#FCFCFC] cursor-pointer shadow-sm hover:bg-[#2F78FD] transition-all"
        >
          채팅하기
        </button>
      )}

      {/* 4. 자세히 보기 버튼 */}
      <div
        onClick={() => navigate(`/ducktalk/exchange/detail/${item.id}?tab=${activeTab}`)}
        className="flex items-center justify-end gap-1 cursor-pointer text-[#A2A2A2] hover:text-[#545454] transition-colors"
      >
        <span className="text-[16px] font-normal leading-[24px]">자세히 보기</span>
        <IoChevronForward size={18} />
      </div>
    </div>
  );
}

export default ExchangeListCard;