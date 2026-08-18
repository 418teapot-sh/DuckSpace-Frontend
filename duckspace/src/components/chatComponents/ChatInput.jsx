import { useState } from "react";

import cameraIcon from "../../assets/chatIcon/camera.svg";
import sendIcon from "../../assets/chatIcon/send.svg";

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    if (onSendMessage) {
      onSendMessage(trimmedMessage);
    }
    setMessage("");
  };

  return (
    <div className="shrink-0 bg-white px-5 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className="
          flex
          items-center
          rounded-[100px]
          border
          border-[#DEDEDE]
          bg-[#F4F4F4]
          px-5
          py-4
          shadow-[0_15px_40px_0_rgba(206,206,206,0.08)]
          backdrop-blur-[10px]
        "
      >
        {/* 카메라 (추후 확장) */}
        <button
          type="button"
          onClick={() => alert("사진 전송 기능은 준비 중입니다.")}
          className="flex shrink-0 items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        >
          <img
            src={cameraIcon}
            alt="사진 첨부"
            className="h-6 w-6"
          />
        </button>

        {/* 입력창 */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
          placeholder="메시지를 입력하세요..."
          disabled={disabled}
          className="
            min-w-0
            flex-1
            bg-transparent
            px-3
            text-[14px]
            text-black
            outline-none
            placeholder:text-[#A2A2A2]
          "
        />

        {/* 전송 버튼 */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`flex shrink-0 items-center justify-center transition-opacity ${
            message.trim() && !disabled
              ? "opacity-100 cursor-pointer"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <img
            src={sendIcon}
            alt="전송"
            className="h-6 w-6"
          />
        </button>
      </form>
      <div className="h-4" />
    </div>
  );
}

export default ChatInput;