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

// 6. [내 마이페이지] 내가 쓴 교환글
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

// 7. [다른 사람 페이지] 다른 사람이 쓴 잡담글
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