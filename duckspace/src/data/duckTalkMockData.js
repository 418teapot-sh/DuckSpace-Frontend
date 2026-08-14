import displayBack from "../assets/displaybackgrounds/display_back.png";

// 내 프로필 정보
export const myProfileData = {
  name: "나",
  score: 98,
  reviewCount: 5,
  followingCount: 30,
  followerCount: 30,
  avatarUrl: null, // 기본 프로필 회색 원
};

// 내가 쓴 잡담글 목데이터
export const myChatPostsData = [
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

// 내가 쓴 교환글 목데이터 (피그마 3가지 버튼 상태 모두 포함)
export const myExchangePostsData = [
  {
    id: 1,
    author: "나",
    score: 98,
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tag: "#우사기 초밥 키링",
    goods: {
      title: "치이카와 키링",
      series: "초밥 시리즈",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
    requestCount: 0, // 교환 신청 0건
    isCompleted: false,
  },
  {
    id: 2,
    author: "나",
    score: 98,
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tag: "#우사기 초밥 키링",
    goods: {
      title: "치이카와 키링",
      series: "초밥 시리즈",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
    requestCount: 0,
    isCompleted: true, // 교환 완료 상태
  },
  {
    id: 3,
    author: "나",
    score: 98,
    date: "2026.08.06",
    content: "우사기 초밥 키링 치이카와로 교환 합니다.",
    tag: "#우사기 초밥 키링",
    goods: {
      title: "치이카와 키링",
      series: "초밥 시리즈",
      status: "미개봉",
      image: displayBack,
    },
    likeCount: 2,
    commentCount: 2,
    requestCount: 1, // 교환 신청 1건
    isCompleted: false,
  },
];