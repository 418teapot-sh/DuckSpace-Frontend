import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoSearch, IoAdd } from "react-icons/io5";

import NavBar from "../components/NavBar";
import DuckTalkModal from "../components/DuckTalkModal";

// 덕톡 마이페이지 아이콘 불러오기
import userIcon from "../assets/ducktalkIcon/userIcon.svg";

import DuckTalkChatCard from "../components/duckTalkComponents/DuckTalkChatCard";
import DuckTalkExchangeCard from "../components/duckTalkComponents/DuckTalkExchangeCard";

import { myChatPostsData, myExchangePostsData } from "../data/duckTalkMockData";


function DuckTalk() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("chat");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* 상단 헤더 */}
      <header className="flex h-16 items-center justify-between px-6">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          aria-label="뒤로가기"
        >
          <IoChevronBack size={24} />
        </button>

        <h1 className="text-xl font-semibold">
          덕톡라운지
        </h1>

        {/* 우측 프로필 아이콘 클릭 시 마이페이지(내가 쓴 글)로 이동 */}
        <button
          onClick={() => navigate("/ducktalk/mypage")}
          className="cursor-pointer flex items-center justify-center"
          aria-label="프로필"
        >
          <img src={userIcon} alt="프로필" className="h-6 w-6 object-contain" />
        </button>
      </header>

      {/* 잡담 / 교환 탭 */}
      <div className="grid grid-cols-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("chat")}
          className={`relative h-12 cursor-pointer text-base ${
            activeTab === "chat"
              ? "font-medium text-[#5791FB]"
              : "text-[#A2A2A2]"
          }`}
        >
          잡담
          {activeTab === "chat" && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#5791FB]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("exchange")}
          className={`relative h-12 cursor-pointer text-base ${
            activeTab === "exchange"
              ? "font-medium text-[#5791FB]"
              : "text-[#A2A2A2]"
          }`}
        >
          교환

          {activeTab === "exchange" && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#5791FB]" />
          )}
        </button>
      </div>

      {/* 검색바 */}
      <div className="px-6 py-5">
        <div className="flex h-12 items-center rounded-xl bg-[#FAFAFA] px-4">
          <IoSearch
            size={24}
            className="mr-3 shrink-0 text-[#D9D9D9]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="키워드로 검색해보세요.(기능 구현 예정)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#A2A2A2]"
          />
        </div>
      </div>

      {/* 게시글 카드 영역 */}
      <main className="px-6">
        {activeTab === "chat" ? (
          <div className="flex flex-col gap-4">
            {myChatPostsData.map((post) => (
              <DuckTalkChatCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myExchangePostsData.map((post) => (
              <DuckTalkExchangeCard 
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}
      </main>

      {/* 글쓰기 + 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="
          fixed
          bottom-28
          right-6
          z-40
          flex
          h-16
          w-16
          cursor-pointer
          items-center
          justify-center
          rounded-full
          bg-[#2F78FD]
          shadow-lg
        "
        aria-label="글쓰기"
      >
        <IoAdd size={42} className="text-white" />
      </button>

      {/* 덕톡 글쓰기 모달 */}
      {isModalOpen && (
        <DuckTalkModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {/* 하단 네비게이션 */}
      <NavBar />
    </div>
  );
}

export default DuckTalk;