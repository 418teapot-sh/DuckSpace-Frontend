import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoSwapHorizontal } from "react-icons/io5";

import NavBar from "../components/NavBar";

// duckTalkComponents 폴더 경로로 정확히 연결
import DuckTalkProfile from "../components/duckTalkComponents/DuckTalkProfile";
import DuckTalkChatCard from "../components/duckTalkComponents/DuckTalkChatCard";
import DuckTalkExchangeCard from "../components/duckTalkComponents/DuckTalkExchangeCard";

// 분리된 목데이터 불러오기
import {
  myProfileData,
  myChatPostsData,
  myExchangePostsData,
} from "../data/duckTalkMockData";

function DuckTalkMyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'exchange'

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* 1. 헤더 */}
      <header className="relative flex h-14 items-center justify-center px-5 border-b border-transparent">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoChevronBack />
        </button>

        <h1 className="text-[18px] font-semibold text-[#171617]">내가 쓴 글</h1>

        <button
          type="button"
          className="absolute right-5 cursor-pointer text-2xl text-[#171617]"
        >
          <IoSwapHorizontal />
        </button>
      </header>

      {/* 2. 내 프로필 영역 */}
      <DuckTalkProfile profile={myProfileData} isMe={true} />

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

      {/* 4. 게시글 리스트 */}
      <main className="flex flex-col gap-3 px-5 pt-4">
        {activeTab === "chat" ? (
          myChatPostsData.map((post) => (
            <DuckTalkChatCard key={post.id} post={post} />
          ))
        ) : (
          myExchangePostsData.map((post) => (
            <DuckTalkExchangeCard key={post.id} post={post} />
          ))
        )}
      </main>

      {/* 5. 하단 네비게이션 바 */}
      <NavBar />
    </div>
  );
}

export default DuckTalkMyPage;