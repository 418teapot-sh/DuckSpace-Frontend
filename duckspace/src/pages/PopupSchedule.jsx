import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoHeart, IoHeartOutline, IoSearch } from "react-icons/io5";

// 전시장 배경 이미지
import displayBack from "../assets/displaybackgrounds/display_back.png";

// 피그마 각 탭 시안을 완벽 구현하기 위한 목데이터
const mockPopups = [
  {
    id: 1,
    title: "치이카와 카페 in 성수",
    status: "ongoing", // 진행중
    statusText: "진행중",
    date: "XX.06.06(월)~XX.07.10(토)",
    location: "서울 성동구 성수이로 74 (성수동2가) 무신사 스토어 성수",
    tags: ["#성수", "#치이카와"],
    image: displayBack,
  },
  {
    id: 2,
    title: "치이카와 카페 in 성수",
    status: "ended", // 종료(완료)
    statusText: "완료",
    date: "XX.06.06(월)~XX.07.10(토)",
    location: "서울 성동구 성수이로 74 (성수동2가) 무신사 스토어 성수",
    tags: ["#성수", "#치이카와"],
    image: displayBack,
  },
  {
    id: 3,
    title: "치이카와 카페 in 성수",
    status: "upcoming", // 예정
    statusText: "예정",
    date: "XX.06.06(월)~XX.07.10(토)",
    location: "서울 성동구 성수이로 74 (성수동2가) 무신사 스토어 성수",
    tags: ["#성수", "#치이카와"],
    image: displayBack,
  },
  {
    id: 4,
    title: "치이카와 카페 in 성수",
    status: "upcoming", // 예정
    statusText: "예정",
    date: "XX.06.06(월)~XX.07.10(토)",
    location: "서울 성동구 성수이로 74 (성수동2가) 무신사 스토어 성수",
    tags: ["#성수", "#치이카와"],
    image: displayBack,
  },
];

function PopupSchedule() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'ongoing' | 'upcoming' | 'ended'
  const [searchTerm, setSearchTerm] = useState("");
  const [likedMap, setLikedMap] = useState({});

  // 찜(하트) 토글
  const toggleLike = (id) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 탭 & 검색 필터링
  const filteredPopups = mockPopups.filter((popup) => {
    const matchesTab = activeTab === "all" || popup.status === activeTab;
    const matchesSearch =
      popup.title.includes(searchTerm) || popup.location.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  // 피그마 Dev Mode 100% 매칭 뱃지 스타일
  const getBadgeStyle = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-[#7EAAFA] text-[#FCFCFC] border-[#5791FB]";
      case "upcoming":
        return "bg-[#FCFCFC] text-[#2F78FD] border-[#A6C3F8]";
      case "ended":
      default:
        return "bg-[#DEDEDE] text-[#858485] border-[#A2A2A2]";
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] pb-24">
      {/* 1. 상단 헤더 */}
      <header className="relative flex h-14 items-center justify-center px-5">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoChevronBack />
        </button>

        <h1 className="text-[18px] font-semibold text-[#171617]">팝업 일정</h1>

        {/* 팝업 위시리스트 페이지로 이동 */}
        <button
          onClick={() => navigate("/popup/wishlist")}
          className="absolute right-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoHeartOutline />
        </button>
      </header>

      {/* 2. 탭 메뉴 (전체 / 진행중 / 예정 / 종료) */}
      <div className="flex w-full border-b border-[#EEEEEE] text-center">
        {[
          { key: "all", label: "전체" },
          { key: "ongoing", label: "진행중" },
          { key: "upcoming", label: "예정" },
          { key: "ended", label: "종료" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 text-[14px] leading-[21px] cursor-pointer transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-[#5791FB] font-semibold text-[#5791FB]"
                : "font-normal text-[#A2A2A2]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. 검색바 */}
      <div className="px-5 py-3.5">
        <div className="flex h-[48px] items-center rounded-lg bg-white/75 border border-white/60 px-4 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
          <IoSearch size={22} className="mr-2 text-[#DEDEDE]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="키워드로 검색해보세요."
            className="w-full bg-transparent text-[16px] leading-[24px] outline-none placeholder:text-[#A2A2A2]"
          />
        </div>
      </div>

      {/* 4. 팝업 카드 리스트 */}
      <main className="flex flex-col gap-3.5 px-5">
        {filteredPopups.map((popup) => (
          <div
            key={popup.id}
            className="flex gap-4 rounded-2xl border border-[#F4F4F4] bg-white/75 p-4 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]"
          >
            {/* 좌측 썸네일 & 찜 하트 */}
            <div className="relative h-[152px] w-[152px] shrink-0 overflow-hidden rounded-lg bg-[#F7F7F7]">
              <img
                src={popup.image}
                alt={popup.title}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => toggleLike(popup.id)}
                className="absolute top-2 left-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#FCFCFC] border border-[#F4F4F4] cursor-pointer shadow-sm"
              >
                {likedMap[popup.id] ? (
                  <IoHeart className="text-xl text-[#2F78FD]" />
                ) : (
                  <IoHeartOutline className="text-xl text-[#545454]" />
                )}
              </button>
            </div>

            {/* 우측 정보 영역 */}
            <div className="flex flex-1 flex-col justify-between py-0.5">
              <div>
                {/* 뱃지 */}
                <span
                  className={`inline-block rounded-[20px] border px-3 py-[2px] text-[11px] font-semibold leading-[17.6px] mb-1 ${getBadgeStyle(
                    popup.status
                  )}`}
                >
                  {popup.statusText}
                </span>

                {/* 팝업 제목 */}
                <h2 className="text-[18px] font-semibold leading-[25.2px] text-[#171617] mb-1">
                  {popup.title}
                </h2>

                {/* 날짜 */}
                <p className="text-[12px] font-normal leading-[19.2px] text-[#858485] mb-1">
                  {popup.date}
                </p>

                {/* 주소 */}
                <p className="text-[12px] font-normal leading-[19.2px] text-[#545454] line-clamp-2">
                  {popup.location}
                </p>
              </div>

              {/* 태그 */}
              <p className="text-[11px] font-normal leading-[17.6px] text-[#2F78FD]">
                {popup.tags.join(" ")}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default PopupSchedule;