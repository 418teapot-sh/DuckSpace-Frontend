import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoSearch, IoClose, IoCheckmarkCircle } from "react-icons/io5";
import NavBar from "../components/NavBar";

// 전시장 배경 이미지 불러오기
import displayBack from "../assets/displaybackgrounds/display_back.png";
import defaultProfile from "../assets/defaultProfile.png";

const RECENT_SEARCH_STORAGE_KEY = "duckspace_recent_user_searches";

// TODO: 백엔드에 "닉네임으로 유저 검색" API(예: GET /api/search/users?keyword=)가 생기면
// MOCK_USERS와 아래 client-side filter를 실제 API 호출로 교체
const MOCK_USERS = [
  { userId: 1, nickname: "덕톡왕덕후", profileImageUrl: defaultProfile, trustScore: 98 },
  { userId: 2, nickname: "굿즈수집가", profileImageUrl: defaultProfile, trustScore: 95 },
  { userId: 3, nickname: "피규어장인", profileImageUrl: defaultProfile, trustScore: 90 },
  { userId: 4, nickname: "덕스페이스러버", profileImageUrl: defaultProfile, trustScore: 99 },
  { userId: 5, nickname: "다른 사람", profileImageUrl: defaultProfile, trustScore: 88 },
];

function loadRecentSearches() {
  try {
    const saved = localStorage.getItem(RECENT_SEARCH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function UserRow({ user, onSelect, onRemove }) {
  return (
    <div
      // blur가 click보다 먼저 발생해서 리스트가 사라지는 것을 막기 위해 mousedown에서 막음
      onMouseDown={(e) => e.preventDefault()}
      onClick={onSelect}
      className="flex cursor-pointer items-center justify-between rounded-lg border border-[#F4F4F4] px-3 py-2.5 transition-colors hover:bg-[#FAFAFA]"
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 overflow-hidden rounded-full bg-[#858485]">
          <img
            src={user.profileImageUrl}
            alt={user.nickname}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-[15px] font-semibold text-[#171617]">
          {user.nickname}
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="flex items-center gap-1 text-[13px] font-medium text-[#2F78FD]">
          <IoCheckmarkCircle size={16} />
          신뢰도 {user.trustScore}
        </span>
        {onRemove && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="cursor-pointer text-[#D9D9D9]"
            aria-label="검색 기록 삭제"
          >
            <IoClose size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(loadRecentSearches);

  // 'idle' = 타이핑 전, 'searching' = 포커스만 된 상태(최근 검색 내역), 'results' = 검색어 입력됨
  const mode = query.trim() ? "results" : isFocused ? "searching" : "idle";

  const results = query.trim()
    ? MOCK_USERS.filter((user) => user.nickname.includes(query.trim()))
    : [];

  const persistRecentSearches = (next) => {
    setRecentSearches(next);
    localStorage.setItem(RECENT_SEARCH_STORAGE_KEY, JSON.stringify(next));
  };

  const handleSelectUser = (user) => {
    const next = [
      user,
      ...recentSearches.filter((item) => item.userId !== user.userId),
    ].slice(0, 10);
    persistRecentSearches(next);
    navigate(`/ducktalk/user?id=${user.userId}`);
  };

  const handleRemoveRecent = (userId) => {
    persistRecentSearches(recentSearches.filter((item) => item.userId !== userId));
  };

  const handleClearAllRecent = () => {
    persistRecentSearches([]);
  };

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="유저 이름으로 검색해보세요."
            className="w-full bg-transparent text-base outline-none placeholder:text-[#A2A2A2]"
          />
          {query && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setQuery("")}
              className="cursor-pointer text-[#D9D9D9]"
              aria-label="검색어 지우기"
            >
              <IoClose size={20} />
            </button>
          )}
        </div>
      </div>

      {/* 3-A. 기본 상태: 덕스페이스 유저 전시장(최신순) 그리드 */}
      {mode === "idle" && (
        <main className="flex flex-col gap-3 px-6 pt-2">
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
      )}

      {/* 3-B. 검색중 상태: 이전 검색 내역 */}
      {mode === "searching" && (
        <main className="flex flex-col px-6 pt-2">
          <div className="flex items-center justify-between pb-2">
            <span className="text-[13px] font-semibold text-[#171617]">
              이전 검색 내역
            </span>
            {recentSearches.length > 0 && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClearAllRecent}
                className="cursor-pointer text-[12px] text-[#A2A2A2]"
              >
                전체 삭제
              </button>
            )}
          </div>

          {recentSearches.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#A2A2A2]">
              최근 검색 내역이 없습니다.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentSearches.map((user) => (
                <UserRow
                  key={user.userId}
                  user={user}
                  onSelect={() => handleSelectUser(user)}
                  onRemove={() => handleRemoveRecent(user.userId)}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* 3-C. 검색결과 상태 */}
      {mode === "results" && (
        <main className="flex flex-col gap-2 px-6 pt-2">
          {results.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#A2A2A2]">
              검색 결과가 없습니다.
            </div>
          ) : (
            results.map((user) => (
              <UserRow
                key={user.userId}
                user={user}
                onSelect={() => handleSelectUser(user)}
              />
            ))
          )}
        </main>
      )}

      {/* 하단 네비게이션 바 */}
      <NavBar />
    </div>
  );
}

export default Search;
