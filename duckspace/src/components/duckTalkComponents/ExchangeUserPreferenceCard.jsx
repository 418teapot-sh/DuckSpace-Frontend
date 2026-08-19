import { IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ExchangeUserPreferenceCard({ user, preferences }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-white/60 bg-white/75 p-4 sm:p-5 shadow-[0px_15px_40px_rgba(205.52,205.52,205.52,0.08)] backdrop-blur-[10px]">
      {/* 상단 사용자 이름 & 신뢰도 */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (!user?.userId) return;

            navigate(`/ducktalk/user?id=${user.userId}`);
          }}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="h-12 w-12 rounded-full bg-[#858485] overflow-hidden" />

          <span className="text-[18px] font-semibold leading-[25.2px] text-[#171617]">
            {user.name}
          </span>
        </button>
        <div className="flex items-center gap-1 text-[#2F78FD]">
          <IoCheckmarkCircle size={20} />
          <span className="text-[16px] font-semibold leading-[20.8px]">
            신뢰도 {user.score}
          </span>
        </div>
      </div>

      {/* 하단 선호 팝업/날짜/시간 태그 */}
      <div className="flex flex-col gap-2 pt-2 border-t border-[#EEEEEE]/60 text-[14px]">
        <div className="flex items-center justify-between">
          <span className="font-semibold leading-[21px] text-[#171617]">선호하는 팝업</span>
          <span className="font-semibold leading-[21px] text-[#2F78FD]"># {preferences.popup}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold leading-[21px] text-[#171617]">선호하는 날짜</span>
          <span className="font-semibold leading-[21px] text-[#2F78FD]"># {preferences.date}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold leading-[21px] text-[#171617]">선호하는 시간</span>
          <span className="font-semibold leading-[21px] text-[#2F78FD]"># {preferences.time}</span>
        </div>
      </div>
    </div>
  );
}

export default ExchangeUserPreferenceCard;
