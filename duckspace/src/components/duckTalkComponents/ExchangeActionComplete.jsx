import { IoClose, IoCheckmark } from "react-icons/io5";

function ExchangeActionComplete({ title, description, listButtonText, onListClick, onChatClick, onClose }) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between pb-10">
      {/* 헤더 */}
      <header className="relative flex h-14 items-center justify-center px-5 border-b border-transparent">
        <h1 className="text-[18px] font-semibold text-[#171617]">완료</h1>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 cursor-pointer text-2xl text-[#171617]"
          aria-label="닫기"
        >
          <IoClose />
        </button>
      </header>

      {/* 중앙 안내 */}
      <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#2F78FD]">
          <IoCheckmark size={44} className="text-white" />
        </div>
        <h2 className="text-[22px] font-bold leading-tight text-[#171617] mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-[18px] font-normal leading-[25.2px] text-[#858485]">
            {description}
          </p>
        )}
      </div>

      {/* 하단 버튼 2종 */}
      <div className="flex flex-col gap-2.5 px-5">
        <button
          type="button"
          onClick={onListClick}
          className="flex h-12 w-full items-center justify-center rounded-lg border border-[#A6C3F8] bg-[#FCFCFC] text-[14px] font-semibold text-[#2F78FD] cursor-pointer"
        >
          {listButtonText}
        </button>
        <button
          type="button"
          onClick={onChatClick}
          className="flex h-12 w-full items-center justify-center rounded-lg border border-[#2F78FD] bg-[#5791FB] text-[14px] font-semibold text-[#FCFCFC] cursor-pointer shadow-sm hover:bg-[#2F78FD] transition-all"
        >
          채팅하기
        </button>
      </div>
    </div>
  );
}

export default ExchangeActionComplete;