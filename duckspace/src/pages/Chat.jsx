import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import { getChatRooms } from "../apis/chatApi";
import defaultProfile from "../assets/defaultProfile.png";

function Chat() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 참여 중인 채팅방 목록 조회
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await getChatRooms();
        setRooms(data || []);
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);

    if (diff < 1) return "방금 전";
    if (diff < 60) return `${diff}분 전`;

    return `${String(date.getFullYear()).slice(2)}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleRoomClick = (room) => {
    const roomId = room.roomId || room.id;
    const partnerNickname =
      room.partnerNickname || room.opponentNickname || room.targetNickname || "상대방";

    navigate(`/chat/${roomId}`, {
      state: {
        partnerNickname,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 상단 헤더 */}
      <header className="relative flex h-[60px] items-center justify-center border-b border-[#F4F4F4]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer"
          aria-label="뒤로가기"
        >
          <IoChevronBack size={24} />
        </button>

        <h1 className="text-[16px] font-medium text-black">채팅</h1>
      </header>

      {/* 채팅 목록 영역 */}
      <div>
        {loading ? (
          <div className="py-20 text-center text-sm text-[#A2A2A2]">
            채팅방 목록을 불러오는 중...
          </div>
        ) : rooms.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#A2A2A2]">
            진행 중인 채팅이 없습니다.
          </div>
        ) : (
          rooms.map((room) => {
            const roomId = room.roomId || room.id;
            const partnerName =
              room.partnerNickname || room.opponentNickname || room.targetNickname || "상대방";
            const lastMsg = room.lastMessage || room.latestMessage?.content || "대화 내용이 없습니다.";
            const lastTime = room.lastMessageAt || room.updatedAt || room.latestMessage?.createdAt;
            const hasUnread = room.hasUnread || (room.unreadCount && room.unreadCount > 0);

            return (
              <button
                key={roomId}
                type="button"
                onClick={() => handleRoomClick(room)}
                className="flex w-full items-center border-b border-[#F4F4F4] px-5 py-4 text-left cursor-pointer hover:bg-gray-50/70 transition-colors"
              >
                {/* 프로필 이미지 */}
                <img
                  src={room.partnerProfileUrl || defaultProfile}
                  alt="프로필"
                  className="h-[40px] w-[40px] shrink-0 rounded-full object-cover bg-gray-100"
                />

                {/* 채팅 요약 정보 */}
                <div className="ml-3 min-w-0 flex-1">
                  <div className="flex items-center">
                    <p className="text-[15px] font-medium text-black truncate max-w-[180px]">
                      {partnerName}
                    </p>

                    <span className="ml-2 text-[12px] text-[#A2A2A2]">
                      {formatTime(lastTime)}
                    </span>

                    {hasUnread && (
                      <span className="ml-1.5 h-[6px] w-[6px] rounded-full bg-[#5791FB]" />
                    )}
                  </div>

                  <p
                    className={`mt-1 truncate text-[13px] ${
                      hasUnread ? "font-medium text-[#2F78FD]" : "text-[#A2A2A2]"
                    }`}
                  >
                    {lastMsg}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      <NavBar />
    </div>
  );
}

export default Chat;