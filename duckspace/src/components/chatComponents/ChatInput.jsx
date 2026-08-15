import { useState } from "react";

import cameraIcon from "../../assets/chatIcon/camera.svg";
import sendIcon from "../../assets/chatIcon/send.svg";

function ChatInput() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    // 나중에 메시지 전송 API 연결
    console.log("보낼 메시지:", trimmedMessage);

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
        {/* 카메라 */}
        {/* 사진 첨부 백엔드 api 명세서에 안나와있길래 아직 구현 X */}
        <button
          type="button"
          className="flex shrink-0 items-center justify-center"
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
          className="
            min-w-0
            flex-1
            bg-transparent
            px-3
            text-[14px]
            text-black
            outline-none
          "
        />

        {/* 전송 */}
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex shrink-0 items-center justify-center"
        >
          <img
            src={sendIcon}
            alt="전송"
            className="h-6 w-6"
          />
        </button>
      </form>
      <div className="h-8"/>
    
    </div>
  );
}

export default ChatInput;