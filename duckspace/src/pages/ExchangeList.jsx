import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

import ExchangeListCard from "../components/duckTalkComponents/ExchangeListCard";
import { exchangeListData } from "../data/duckTalkMockData";

function ExchangeList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sent");

  const tabList = [
    { key: "sent", label: "보낸 신청" },
    { key: "received", label: "받은 신청" },
    { key: "progress", label: "진행중" },
    { key: "completed", label: "완료" },
  ];

  const currentItems = exchangeListData[activeTab] || [];

  return (
    <div className="min-h-screen bg-[#FEFEFE] pb-28">
      {/* 1. 헤더 */}
      <header className="relative flex h-14 items-center justify-center px-5 border-b border-transparent">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl text-[#171617]"
          aria-label="뒤로가기"
        >
          <IoChevronBack />
        </button>
        <h1 className="text-[18px] font-semibold text-[#171617]">교환 목록</h1>
      </header>

      {/* 2. 4단 탭 */}
      <div className="flex border-b border-[#EEEEEE] text-center">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            type="button"
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

      {/* 3. 카드 목록 */}
      <main className="flex flex-col gap-3.5 px-5 pt-3.5">
        {currentItems.map((item) => (
          <ExchangeListCard key={item.id} item={item} activeTab={activeTab} />
        ))}
      </main>
    </div>
  );
}

export default ExchangeList;