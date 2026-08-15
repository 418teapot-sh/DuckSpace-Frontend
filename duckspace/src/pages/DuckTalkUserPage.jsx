import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoStorefrontOutline } from "react-icons/io5";

import NavBar from "../components/NavBar";
import DuckTalkProfile from "../components/DuckTalkComponents/DuckTalkProfile";
import DuckTalkChatCard from "../components/DuckTalkComponents/DuckTalkChatCard";
import DuckTalkExchangeCard from "../components/DuckTalkComponents/DuckTalkExchangeCard";

// 다른 사람 목데이터 불러오기
import {
  otherUserProfileData,
  otherUserChatPostsData,
  otherUserExchangePostsData,
} from "../data/duckTalkMockData";

function DuckTalkUserPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'exchange'

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* 1. 상단 헤더 */}
      <header className="relative flex h-14 items-center justify-center px-5 border-b border-transparent">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoChevronBack />
        </button>

        <h1 className="text-[18px] font-semibold text-[#171617]">덕톡 라운지</h1>

        {/* 우측 상단 유저 전시장(장식장) 보기 아이콘 */}
        <button
          type="button"
          onClick={() => navigate("/display")}
          className="absolute right-5 cursor-pointer text-2xl text-[#171617]"
          title="유저 전시장 보기"
        >
          <IoStorefrontOutline />
        </button>
      </header>

      {/* 2. 다른 사람 프로필 영역 */}
      <DuckTalkProfile profile={otherUserProfileData} isMe={false} />

      {/* 3. 잡담 / 교환 탭 */}
      <div className="flex border-b border-[#EEEEEE] text-center">
        <button
          type="button"
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-2.5 text-[14px] leading-[21px] cursor-pointer transition-colors ${
            activeTab === "chat"
              ? "border-b-2 border-[#5791FB] font-semibold text-[#5791FB]"
              : "font-normal text-[#A2A2A2]"
          }`}
        >
          잡담
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("exchange")}
          className={`flex-1 py-2.5 text-[14px] leading-[21px] cursor-pointer transition-colors ${
            activeTab === "exchange"
              ? "border-b-2 border-[#5791FB] font-semibold text-[#5791FB]"
              : "font-normal text-[#A2A2A2]"
          }`}
        >
          교환
        </button>
      </div>

      {/* 4. 게시글 목록 영역 */}
      <main className="flex flex-col gap-3 px-5 pt-4">
        {activeTab === "chat" ? (
          otherUserChatPostsData.map((post) => (
            <DuckTalkChatCard key={post.id} post={post} />
          ))
        ) : (
          otherUserExchangePostsData.map((post) => (
            <DuckTalkExchangeCard
              key={post.id}
              post={post}
              mode="otherUser"
            />
          ))
        )}
      </main>

      {/* 5. 하단 네비게이션 바 */}
      <NavBar />
    </div>
  );
}

export default DuckTalkUserPage;