import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoSearch, IoClose } from "react-icons/io5";
import NavBar from "../components/NavBar";

import {
  searchUsers,
  getUserSearchHistory,
  recordUserSearchHistory,
  clearUserSearchHistory,
} from "../apis/searchApi";
import { getExhibitionFeed } from "../apis/displayApi";

// 전시장 배경 이미지 불러오기
import displayBack from "../assets/displaybackgrounds/display_back.png";
import defaultProfile from "../assets/defaultProfile.png";

const FEED_PAGE_SIZE = 12;
const FEED_MAX_FETCH = 50; // /api/exhibitions는 limit만 있고 cursor가 없어 최대치까지 한 번에 받아 프론트에서 나눠 보여준다

function UserRow({ user, onSelect }) {
  return (
    <div
      // blur가 click보다 먼저 발생해서 리스트가 사라지는 것을 막기 위해 mousedown에서 막음
      onMouseDown={(e) => e.preventDefault()}
      onClick={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#F4F4F4] px-3 py-2.5 transition-colors hover:bg-[#FAFAFA]"
    >
      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#858485]">
        <img
          src={user.profileImageUrl || defaultProfile}
          alt={user.nickname}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-[15px] font-semibold text-[#171617]">
        {user.nickname}
      </span>
    </div>
  );
}

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [exhibitionFeed, setExhibitionFeed] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [visibleFeedCount, setVisibleFeedCount] = useState(FEED_PAGE_SIZE);
  const feedSentinelRef = useRef(null);

  // 'idle' = 타이핑 전, 'searching' = 포커스만 된 상태(최근 검색 내역), 'results' = 검색어 입력됨
  const mode = query.trim() ? "results" : isFocused ? "searching" : "idle";

  // 검색어 입력 시 실제 유저 검색 API 호출 (디바운스 300ms)
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      try {
        const data = await searchUsers({ keyword: query.trim() });
        setResults(data || []);
      } catch (error) {
        console.error("유저 검색 실패:", error);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  // 기본 화면 진입 시 최신 장식장 피드 조회 (최신 등록순 — API가 이미 정렬해서 내려줌)
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setFeedLoading(true);
        const data = await getExhibitionFeed({ limit: FEED_MAX_FETCH });
        setExhibitionFeed(data || []);
      } catch (error) {
        console.error("장식장 피드 조회 실패:", error);
      } finally {
        setFeedLoading(false);
      }
    };

    fetchFeed();
  }, []);

  // 그리드 하단에 닿으면 12개씩 더 보여준다 (백엔드에 cursor 페이징이 없어 이미 받아둔 목록 안에서만 늘림)
  useEffect(() => {
    const sentinel = feedSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleFeedCount((prev) =>
            Math.min(prev + FEED_PAGE_SIZE, exhibitionFeed.length)
          );
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [exhibitionFeed.length]);

  // 검색창에 포커스가 갈 때마다 최근 검색 내역 조회
  useEffect(() => {
    if (!isFocused) return;

    const fetchHistory = async () => {
      try {
        const data = await getUserSearchHistory();
        setRecentSearches(data || []);
      } catch (error) {
        console.error("최근 검색 내역 조회 실패:", error);
      }
    };

    fetchHistory();
  }, [isFocused]);

  const handleSelectUser = async (user) => {
    try {
      await recordUserSearchHistory(user.userId);
    } catch (error) {
      console.error("검색 내역 기록 실패:", error);
    }
    navigate(`/ducktalk/user?id=${user.userId}`);
  };

  const handleClearAllRecent = async () => {
    try {
      await clearUserSearchHistory();
      setRecentSearches([]);
    } catch (error) {
      console.error("검색 내역 삭제 실패:", error);
    }
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
          {feedLoading ? (
            <div className="py-16 text-center text-sm text-[#A2A2A2]">
              불러오는 중...
            </div>
          ) : exhibitionFeed.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#A2A2A2]">
              아직 등록된 장식장이 없습니다.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {exhibitionFeed.slice(0, visibleFeedCount).map((exhibition) => (
                  <div
                    key={exhibition.exhibitionId}
                    onClick={() => navigate(`/display?id=${exhibition.exhibitionId}`)}
                    className="aspect-[9/10] cursor-pointer overflow-hidden rounded-xl border border-white/60 bg-[#F7F7F7] shadow-sm"
                  >
                    <img
                      src={exhibition.thumbnailUrl || displayBack}
                      alt={exhibition.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* 그리드 하단 감지용 — 화면에 보이면 다음 12개를 더 보여준다 */}
              {visibleFeedCount < exhibitionFeed.length && (
                <div ref={feedSentinelRef} className="py-4 text-center text-xs text-[#D9D9D9]">
                  더 불러오는 중...
                </div>
              )}
            </>
          )}
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
