import api from "./api";

// 1. 참여 중인 채팅방 목록 조회
export const getChatRooms = async () => {
  const res = await api.get("/api/chat/rooms");
  return res.data.data;
};

// 2. 채팅방 생성 또는 기존 방 조회 (상대방 partnerId 기준)
export const createOrGetChatRoom = async (partnerId) => {
  // ✅ 백엔드 명세에 맞게 파라미터를 postId가 아닌 partnerId로 전송!
  const res = await api.post("/api/chat/rooms", {
    partnerId: Number(partnerId),
  });
  return res.data.data;
};

// 3. 특정 채팅방 메시지 내역 조회 (폴링용)
export const getChatMessages = async (roomId, { cursor, size = 50 } = {}) => {
  const params = { size };
  if (cursor) params.cursor = cursor;
  const res = await api.get(`/api/chat/rooms/${roomId}/messages`, { params });
  return res.data.data;
};

// 4. 메시지 전송
export const sendChatMessage = async (roomId, content) => {
  const res = await api.post(`/api/chat/rooms/${roomId}/messages`, {
    content,
  });
  return res.data.data;
};

// 5. 채팅방 나가기
export const leaveChatRoom = async (roomId) => {
  await api.delete(`/api/chat/rooms/${roomId}`);
};