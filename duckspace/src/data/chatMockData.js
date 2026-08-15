export const chatMockData = [
  {
    roomId: 3,
    partnerId: 42,
    partnerNickname: "다른 사람",
    lastMessage: "내일 12시 어떠세요?",
    lastMessageAt: "2026-08-15T19:40:00",
    hasUnread: true,
  },
  {
    roomId: 4,
    partnerId: 27,
    partnerNickname: "다른 사람",
    lastMessage: "내일 12시 어떠세요?",
    lastMessageAt: "2026-08-12T14:02:11",
    hasUnread: false,
  },
];

export const chatMessageMockData = [
  {
    messageId: 17,
    senderId: 42,
    mine: false,
    content: "내일 12시 어떠세요?",
    createdAt: "2026-08-15T19:35:00",
  },
  {
    messageId: 18,
    senderId: 1,
    mine: true,
    content: "1시가 좋아요.",
    createdAt: "2026-08-15T19:36:00",
  },
  {
    messageId: 19,
    senderId: 42,
    mine: false,
    content: "싫어요.",
    createdAt: "2026-08-15T19:38:00",
  },
  {
    messageId: 20,
    senderId: 42,
    mine: false,
    content: "내일 12시 어떠세요?",
    createdAt: "2026-08-15T19:39:00",
  },
  {
    messageId: 21,
    senderId: 1,
    mine: true,
    content: "1시가 좋아요.",
    createdAt: "2026-08-15T19:40:00",
  },
];