import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import { chatMockData } from "../data/chatMockData";

import defaultProfile from "../assets/defaultProfile.png";

function Chat() {
  const navigate = useNavigate();

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diff = Math.floor((now - date) / 1000 / 60);

    if (diff < 1) return "방금 전";
    if (diff < 60) return `${diff}분전`;

    return `${String(date.getFullYear()).slice(2)}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleRoomClick = (room) => {
    navigate(`/chat/${room.roomId}`, {
      state: {
        partnerNickname: room.partnerNickname,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 헤더 */}
      <header className="relative flex h-[60px] items-center justify-center border-b border-[#F4F4F4]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5"
        >
          <IoChevronBack size={24} />
        </button>

        <h1 className="text-[16px] font-medium text-black">
          채팅
        </h1>
      </header>

      {/* 채팅 리스트 */}
      <div>
        {chatMockData.map((room) => (
          <button
            key={room.roomId}
            type="button"
            onClick={() => handleRoomClick(room)}
            className="flex w-full items-center border-b border-[#F4F4F4] px-5 py-4 text-left"
          >
            {/* 프로필 */}
            <img
              src={defaultProfile}
              alt="프로필"
              className="h-[40px] w-[40px] shrink-0 rounded-full object-cover"
            />

            {/* 채팅 정보 */}
            <div className="ml-3 min-w-0 flex-1">
              <div className="flex items-center">
                <p className="text-[15px] font-medium text-black">
                  {room.partnerNickname}
                </p>

                <span className="ml-2 text-[12px] text-[#A2A2A2]">
                  {formatTime(room.lastMessageAt)}
                </span>

                {room.hasUnread && (
                  <span className="ml-1 h-[6px] w-[6px] rounded-full bg-[#5791FB]" />
                )}
              </div>

              <p
                className={`mt-1 truncate text-[13px] ${
                  room.hasUnread
                    ? "text-[#5791FB]"
                    : "text-[#A2A2A2]"
                }`}
              >
                {room.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>

      <NavBar />
    </div>
  );
}

export default Chat;