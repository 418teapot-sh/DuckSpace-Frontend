import displayBack from "../assets/displaybackgrounds/display_back.png";

// 1. [내 프로필]
export const myProfileData = {
  id: "me",
  name: "나",
  score: 98,
  reviewCount: 5,
  followingCount: 30,
  followerCount: 30,
  avatarUrl: null,
};

// 2. [다른 사람 프로필]
export const otherUserProfileData = {
  id: "other",
  name: "다른사람",
  score: 98,
  reviewCount: 5,
  followingCount: 30,
  followerCount: 30,
  isFollowing: false, // 팔로우 상태 (false: 팔로우, true: 팔로잉)
  avatarUrl: null,
};

// 3. [메인 피드] 잡담글
export const feedChatPostsData = [
  {
    id: 1,
    author: "나",
    date: "2026.08.06",
    content:
      "그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..",
    likeCount: 2,
    commentCount: 2,
    image: null,
  },
  {
    id: 2,
    author: "다른사람",
    date: "2026.08.06",
    content:
      "그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..",
    likeCount: 2,
    commentCount: 2,
    image: displayBack,
  },
  {
    id: 3,
    author: "다른사람",
    date: "2026.08.06",
    content:
      "그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..",
    likeCount: 2,
    commentCount: 2,
    image: null,
  },
];

// 4. [메인 피드] 교환글
export const feedExchangePostsData = [
  {
    id: 1,
    author: "다른사람",
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tags: ["#치이카와 팝업", "#260809", "#우사기 초밥 키링"],
    goods: {
      title: "치이카와 키링",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
    isCompleted: true, // 교환 완료
  },
  {
    id: 2,
    author: "다른사람",
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tags: ["#치이카와 팝업", "#260809", "#우사기 초밥 키링"],
    goods: {
      title: "치이카와 키링",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
    isCompleted: false, // 교환 신청 가능
  },
];

// 5. [내 마이페이지] 내가 쓴 잡담글
export const myChatPostsData = [
  {
    id: 1,
    author: "나",
    date: "2026.08.06",
    content:
      "그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..",
    likeCount: 2,
    commentCount: 2,
  },
  {
    id: 2,
    author: "나",
    date: "2026.08.06",
    content:
      "그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..",
    likeCount: 2,
    commentCount: 2,
  },
];

// 6. [내 마이페이지] 내가 쓴 교환글 (3가지 상태 보존)
export const myExchangePostsData = [
  {
    id: 1,
    author: "나",
    score: 98,
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tags: ["#우사기 초밥 키링"],
    goods: {
      title: "치이카와 키링",
      series: "초밥 시리즈",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
    requestCount: 0,
    isCompleted: false,
  },
  {
    id: 2,
    author: "나",
    score: 98,
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tags: ["#우사기 초밥 키링"],
    goods: {
      title: "치이카와 키링",
      series: "초밥 시리즈",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
    requestCount: 0,
    isCompleted: true,
  },
  {
    id: 3,
    author: "나",
    score: 98,
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tags: ["#우사기 초밥 키링"],
    goods: {
      title: "치이카와 키링",
      series: "초밥 시리즈",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
    requestCount: 1,
    isCompleted: false,
  },
];

// 7. [다른 사람 페이지] 다른 사람이 쓴 잡담글 (2개 보존)
export const otherUserChatPostsData = [
  {
    id: 1,
    author: "다른사람",
    date: "2026.08.06",
    content:
      "그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..",
    likeCount: 2,
    commentCount: 2,
  },
  {
    id: 2,
    author: "다른사람",
    date: "2026.08.06",
    content:
      "그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..그냥 우사기가 나 먹여 살려주면 좋겠어..",
    likeCount: 2,
    commentCount: 2,
  },
];

// 8. [다른 사람 페이지] 다른 사람이 쓴 교환글
export const otherUserExchangePostsData = [
  {
    id: 1,
    author: "다른사람",
    score: 98,
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tags: ["#우사기 초밥 키링"],
    goods: {
      title: "치이카와 키링",
      series: "초밥 시리즈",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
  },
];

// 9. [교환 목록 페이지] 4개 탭별 데이터 (추가)
export const exchangeListData = {
  sent: [
    {
      id: "sent-1",
      user: { name: "다른 사람", score: 98 },
      myGoods: "치이카와 키링",
      targetGoods: "우사기 키링",
      status: "pending",
    },
    {
      id: "sent-2",
      user: { name: "다른 사람", score: 98 },
      myGoods: "치이카와 키링",
      targetGoods: "우사기 키링",
      status: "canceled",
    },
  ],
  received: [
    {
      id: "received-1",
      user: { name: "다른 사람", score: 98 },
      myGoods: "치이카와 키링",
      targetGoods: "우사기 키링",
      status: "pending",
    },
    {
      id: "received-2",
      user: { name: "다른 사람", score: 98 },
      myGoods: "치이카와 키링",
      targetGoods: "우사기 키링",
      status: "rejected",
    },
  ],
  progress: [
    {
      id: "progress-1",
      user: { name: "다른 사람", score: 98 },
      myGoods: "치이카와 키링",
      targetGoods: "우사기 키링",
      status: "in_progress",
    },
    {
      id: "progress-2",
      user: { name: "다른 사람", score: 98 },
      myGoods: "치이카와 키링",
      targetGoods: "우사기 키링",
      status: "in_progress",
    },
  ],
  completed: [
    {
      id: "completed-1",
      user: { name: "다른 사람", score: 98 },
      myGoods: "치이카와 키링",
      targetGoods: "우사기 키링",
      status: "done",
    },
    {
      id: "completed-2",
      user: { name: "다른 사람", score: 98 },
      myGoods: "치이카와 키링",
      targetGoods: "우사기 키링",
      status: "done",
    },
  ],
};

// 10. [교환 상세 페이지] 공통 상세 목데이터 (추가)
export const defaultExchangeDetailInfo = {
  user: {
    name: "다른 사람",
    score: 98,
  },
  preferences: {
    popup: "치이카와 스시 팝업",
    date: "260809",
    time: "12시부터14시까지",
  },
  message: "12시 30분에 정문에서 교환하고 싶어요.",
  myGoods: {
    title: "치이카와 키링",
    status: "미개봉",
    image: displayBack,
  },
  targetGoods: {
    title: "우사기 키링",
    status: "미개봉",
    image: displayBack,
  },
};