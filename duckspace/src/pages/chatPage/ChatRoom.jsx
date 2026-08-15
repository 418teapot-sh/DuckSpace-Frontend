import { IoChevronBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

import { chatMessageMockData } from "../../data/chatMockData";

import ChatMessage from "../../components/chatComponents/ChatMessage";
import ChatInput from "../../components/chatComponents/ChatInput";

import defaultProfile from "../../assets/defaultProfile.png";

function ChatRoom() {
  const navigate = useNavigate();
  const location = useLocation();

  const partnerNickname =
    location.state?.partnerNickname || "다른 사람";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 헤더 */}
      <header className="relative flex h-[60px] shrink-0 items-center justify-center border-b border-[#F4F4F4]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5"
        >
          <IoChevronBack size={24} />
        </button>

        <h1 className="text-[16px] font-medium text-black">
          {partnerNickname}
        </h1>
      </header>

      {/* 메시지 영역 */}
      <main className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col gap-4">
          {chatMessageMockData.map((message) => (
            <ChatMessage
              key={message.messageId}
              message={message}
              partnerNickname={partnerNickname}
              profileImage={defaultProfile}
            />
          ))}
        </div>
      </main>

      {/* 입력창 */}
      <ChatInput />
    </div>
  );
}

export default ChatRoom;