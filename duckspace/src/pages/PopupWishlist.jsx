import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoHeart } from "react-icons/io5";

// 대표 이미지 (프로젝트 에셋)
import displayBack from "../assets/displaybackgrounds/display_back.png";

// 위시리스트(내가 찜한 팝업) 목데이터
const initialWishlist = [
  {
    id: 1,
    title: "치이카와 카페 in 성수",
    status: "ended",
    statusText: "완료",
    date: "XX.06.06(월)~XX.07.10(토)",
    location: "서울 성동구 성수이로 74 (성수동2가) 무신사 스토어 성수",
    tags: ["#성수", "#치이카와"],
    image: displayBack,
  },
  {
    id: 2,
    title: "치이카와 카페 in 성수",
    status: "ended",
    statusText: "완료",
    date: "XX.06.06(월)~XX.07.10(토)",
    location: "서울 성동구 성수이로 74 (성수동2가) 무신사 스토어 성수",
    tags: ["#성수", "#치이카와"],
    image: displayBack,
  },
  {
    id: 3,
    title: "치이카와 카페 in 성수",
    status: "ended",
    statusText: "완료",
    date: "XX.06.06(월)~XX.07.10(토)",
    location: "서울 성동구 성수이로 74 (성수동2가) 무신사 스토어 성수",
    tags: ["#성수", "#치이카와"],
    image: displayBack,
  },
  {
    id: 4,
    title: "치이카와 카페 in 성수",
    status: "ended",
    statusText: "완료",
    date: "XX.06.06(월)~XX.07.10(토)",
    location: "서울 성동구 성수이로 74 (성수동2가) 무신사 스토어 성수",
    tags: ["#성수", "#치이카와"],
    image: displayBack,
  },
];

function PopupWishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(initialWishlist);

  // 하트 해제 시 목록에서 제거 토글
  const handleRemoveLike = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // 뱃지 스타일
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
      <header className="relative flex h-14 items-center justify-center px-5 border-b border-[#F4F4F4]">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoChevronBack />
        </button>

        <h1 className="text-[18px] font-semibold text-[#171617]">
          팝업 위시리스트
        </h1>
      </header>

      {/* 2. 찜한 팝업 리스트 */}
      <main className="flex flex-col gap-3.5 px-5 pt-4">
        {wishlist.length === 0 ? (
          <div className="flex h-60 flex-col items-center justify-center text-[#A2A2A2]">
            위시리스트가 비어있습니다.
          </div>
        ) : (
          wishlist.map((popup) => (
            <div
              key={popup.id}
              className="flex gap-4 rounded-2xl border border-[#F4F4F4] bg-white/75 p-4 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]"
            >
              {/* 좌측 썸네일 & 파란 하트 아이콘 */}
              <div className="relative h-[152px] w-[152px] shrink-0 overflow-hidden rounded-lg bg-[#F7F7F7]">
                <img
                  src={popup.image}
                  alt={popup.title}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => handleRemoveLike(popup.id)}
                  className="absolute top-2 left-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#FCFCFC] border border-[#F4F4F4] cursor-pointer shadow-sm"
                >
                  <IoHeart className="text-xl text-[#2F78FD]" />
                </button>
              </div>

              {/* 우측 정보 */}
              <div className="flex flex-1 flex-col justify-between py-0.5">
                <div>
                  <span
                    className={`inline-block rounded-[20px] border px-3 py-[2px] text-[11px] font-semibold leading-[17.6px] mb-1 ${getBadgeStyle(
                      popup.status
                    )}`}
                  >
                    {popup.statusText}
                  </span>

                  <h2 className="text-[18px] font-semibold leading-[25.2px] text-[#171617] mb-1">
                    {popup.title}
                  </h2>

                  <p className="text-[12px] font-normal leading-[19.2px] text-[#858485] mb-1">
                    {popup.date}
                  </p>

                  <p className="text-[12px] font-normal leading-[19.2px] text-[#545454] line-clamp-2">
                    {popup.location}
                  </p>
                </div>

                <p className="text-[11px] font-normal leading-[17.6px] text-[#2F78FD]">
                  {popup.tags.join(" ")}
                </p>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default PopupWishlist;