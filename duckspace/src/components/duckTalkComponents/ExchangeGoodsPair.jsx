import { IoSwapVertical } from "react-icons/io5";

function ExchangeGoodsPair({ sectionTitle, firstGoods, secondGoods }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-white/75 p-5 shadow-[0px_15px_40px_rgba(205.52,205.52,205.52,0.08)] backdrop-blur-[10px]">
      <div className="w-full text-left">
        <h2 className="text-[18px] font-semibold leading-[25.2px] text-[#171617]">
          {sectionTitle}
        </h2>
      </div>

      {/* 1번째 굿즈 */}
      <div className="flex w-full items-center gap-7 rounded-lg border border-white/60 bg-white/75 p-4 shadow-[0px_15px_40px_rgba(205.52,205.52,205.52,0.08)] backdrop-blur-[10px]">
        <img
          src={firstGoods.image}
          alt={firstGoods.title}
          className="h-[124px] w-[124px] shrink-0 rounded-lg border border-[#DEDEDE] object-cover"
        />
        <div className="flex flex-col items-start gap-2">
          <div
            className={`rounded-full px-3 py-0.5 text-[11px] font-semibold leading-[17.6px] ${
              firstGoods.isMine
                ? "border border-[#5791FB] bg-[#7EAAFA] text-[#FCFCFC]"
                : "border border-[#A6C3F8] bg-[#FCFCFC] text-[#2F78FD]"
            }`}
          >
            {firstGoods.label}
          </div>
          <h3 className="text-[18px] font-semibold leading-[25.2px] text-[#171617]">
            {firstGoods.title}
          </h3>
          <p className="text-[16px] leading-[24px] text-[#A2A2A2]">
            {firstGoods.status}
          </p>
        </div>
      </div>

      {/* 상하 교환 화살표 */}
      <IoSwapVertical size={24} className="text-[#171617] my-1" />

      {/* 2번째 굿즈 */}
      <div className="flex w-full items-center gap-7 rounded-lg border border-white/60 bg-white/75 p-4 shadow-[0px_15px_40px_rgba(205.52,205.52,205.52,0.08)] backdrop-blur-[10px]">
        <img
          src={secondGoods.image}
          alt={secondGoods.title}
          className="h-[124px] w-[124px] shrink-0 rounded-lg border border-[#DEDEDE] object-cover"
        />
        <div className="flex flex-col items-start gap-2">
          <div
            className={`rounded-full px-3 py-0.5 text-[11px] font-semibold leading-[17.6px] ${
              secondGoods.isMine
                ? "border border-[#5791FB] bg-[#7EAAFA] text-[#FCFCFC]"
                : "border border-[#A6C3F8] bg-[#FCFCFC] text-[#2F78FD]"
            }`}
          >
            {secondGoods.label}
          </div>
          <h3 className="text-[18px] font-semibold leading-[25.2px] text-[#171617]">
            {secondGoods.title}
          </h3>
          <p className="text-[16px] leading-[24px] text-[#A2A2A2]">
            {secondGoods.status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExchangeGoodsPair;