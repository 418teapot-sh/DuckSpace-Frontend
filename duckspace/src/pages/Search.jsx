import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoSearch } from "react-icons/io5";
import NavBar from "../components/NavBar";

// 전시장 배경 이미지 불러오기
import displayBack from "../assets/displaybackgrounds/display_back.png";

function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* 1. 헤더 (뒤로가기 & 타이틀) */}
      <header className="relative flex h-14 items-center justify-center px-5">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoChevronBack />
        </button>
        <h1 className="text-lg font-semibold text-[#171617]">검색</h1>
      </header>

      {/* 2. 검색바 */}
      <div className="px-6 py-3">
        <div className="flex h-12 items-center rounded-xl bg-[#FAFAFA] border border-[#EEEEEE] px-4 shadow-sm">
          <IoSearch size={22} className="mr-2 text-[#D9D9D9]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="키워드로 검색해보세요."
            className="w-full bg-transparent text-base outline-none placeholder:text-[#A2A2A2]"
          />
        </div>
      </div>

      {/* 3. 전시장 격자(Grid) 리스트 */}
      <main className="flex flex-col gap-3 px-6 pt-2">
        {/* Pattern 1: 좌측 큰 전시장 (2칸) + 우측 세로 2개 (1칸) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 h-[294px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F7F7] shadow-sm">
            <img
              src={displayBack}
              alt="유저 전시장"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
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

        {/* Pattern 2: 가로 3개 동일 비율 전시장 */}
        <div className="grid grid-cols-3 gap-3">
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
          <div className="h-[141px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F7F7] shadow-sm">
            <img
              src={displayBack}
              alt="유저 전시장"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Pattern 3: 좌측 일반 전시장 (1칸) + 우측 와이드 전시장 (2칸) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1 h-[141px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F7F7] shadow-sm">
            <img
              src={displayBack}
              alt="유저 전시장"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-span-2 h-[141px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F7F7] shadow-sm">
            <img
              src={displayBack}
              alt="유저 전시장"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </main>

      {/* 하단 네비게이션 바 */}
      <NavBar />
    </div>
  );
}

export default Search;