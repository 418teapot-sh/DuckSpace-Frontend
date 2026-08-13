import { IoChevronForward } from "react-icons/io5";
import NavBar from "../components/NavBar";

// 로고 및 배경 이미지 불러오기
import mainLogo from "../assets/duckspace_mainIcon.svg";
import displayBack from "../assets/displaybackgrounds/display_back.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-white pb-28">
      {/* 1. 상단 로고 헤더 */}
      <header className="flex h-16 items-center justify-between px-6">
        <img
          src={mainLogo}
          alt="DuckSpace Logo"
          className="h-[37px] w-auto object-contain"
        />
      </header>

      {/* 2. 메인 배너 (치이카와 팝업 등) */}
      <section className="mt-2 mb-8 px-5">
        <div className="flex items-center justify-center gap-3 overflow-hidden">
          {/* 중앙 메인 카드 */}
          <div className="relative flex h-40 w-full max-w-[320px] flex-col items-center justify-end rounded-2xl bg-[#CDDCF7] p-4 text-white shadow-sm border border-white/60">
            <h2 className="mb-2 text-lg font-bold text-[#FCFCFC]">
              치이카와 팝업
            </h2>
            <div className="flex items-center gap-1 text-xs text-[#FCFCFC]">
              <span>1</span>
              <span>|</span>
              <span>5</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 다가오는 팝업 섹션 */}
      <section className="mb-8 px-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#171617]">
            다가오는 팝업
          </h3>
          <button className="flex items-center text-sm text-[#A2A2A2] cursor-pointer">
            더보기
            <IoChevronForward size={16} />
          </button>
        </div>

        {/* 카드 2개 가로 배치 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-28 rounded-xl bg-[#CDDCF7] border border-white/60 shadow-sm" />
          <div className="h-28 rounded-xl bg-[#CDDCF7] border border-white/60 shadow-sm" />
        </div>
      </section>

      {/* 4. 다른 유저 전시장 섹션 */}
      <section className="px-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#171617]">
            다른 유저 전시장
          </h3>
          <button className="flex items-center text-sm text-[#A2A2A2] cursor-pointer">
            더보기
            <IoChevronForward size={16} />
          </button>
        </div>

        {/* 전시장 격자 레이아웃 (좌측 큰 카드 1개 + 우측 작은 카드 2개) */}
        <div className="grid grid-cols-2 gap-3">
          {/* 좌측 큰 전시장 */}
          <div className="h-[294px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F7F7] shadow-sm">
            <img
              src={displayBack}
              alt="유저 전시장"
              className="h-full w-full object-cover"
            />
          </div>

          {/* 우측 세로 2개 전시장 */}
          <div className="flex flex-col gap-3">
            <div className="h-[141px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F7F7] shadow-sm">
              <img
                src={displayBack}
                alt="유저 전시장"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[141px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F7F7] shadow-sm">
              <img
                src={displayBack}
                alt="유저 전시장"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 하단 네비게이션 바 */}
      <NavBar />
    </div>
  );
};

export default Home;