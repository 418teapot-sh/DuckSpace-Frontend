import { IoChevronBack, IoEllipsisHorizontal, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DisplayEdit from "../components/DisplayEdit";
import DisplayGoods from "../components/DisplayGoods";
import NavBar from "../components/NavBar";

function Display() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("display");

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 헤더 */}
      <header className="relative flex h-14 items-center justify-center px-5">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 cursor-pointer text-2xl"
        >
          <IoChevronBack />
        </button>

        <h1 className="text-[20px] font-semibold text-black">
          장식장
        </h1>
      </header>

      {/* 프로필 영역 */}
      <section className="flex items-center justify-between px-7 py-5">
        <div className="flex items-center gap-3">
          {/* 임시 프로필 이미지 */}
          <div className="h-14 w-14 overflow-hidden rounded-full bg-[#F4F4F4]">
            <img
              src="/favicon.svg"
              alt="프로필"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-[20px] font-semibold text-black">
              나(기능 구현 예정)
            </p>

            <p className="mt-1 text-[14px] text-[#A2A2A2]">
              팔로워 30 | 팔로잉30
            </p>
          </div>
        </div>

        <button className="cursor-pointer text-2xl text-[#A2A2A2]">
          <IoEllipsisHorizontal />
        </button>
      </section>

      {/* 탭 영역 */}
      <section className="px-7 ">
        <div className="flex border-b border-[#EEEEEE] ">
          {/* 장식장 1 */}
          <button
            onClick={() => setActiveTab("display")}
            className={`
              flex-1
              py-3
              text-[16px]
              font-medium
              cursor-pointer
              ${
                activeTab === "display"
                  ? "border-b-2 border-[#5791FB] text-[#5791FB]"
                  : "text-[#A2A2A2]"
              }
            `}
          >
            장식장 1
          </button>

          {/* 새 장식장 추가 */}
          <button
            onClick={() => setActiveTab("add")}
            className={`
              flex-1
              py-3
              text-[26px]
              cursor-pointer
              ${
                activeTab === "add"
                  ? "border-b-2 border-[#5791FB] text-[#5791FB]"
                  : "text-[#A2A2A2]"
              }
            `}
          >
            +
          </button>
        </div>
      </section>

      {/* 전시장 */}
      <section className="px-7 pt-3">
        <DisplayEdit />
      </section>

      {/* 좋아요 영역 */}
      <section className="flex items-center justify-center gap-1 py-4">
        <IoHeartOutline className="text-[24px] text-[#555555]" />
        <span className="text-[15px] text-[#555555]">
          2(기능 구현 예정)
        </span>
      </section>

      {/* 전시된 굿즈 */}
      <section className="px-7">
        <DisplayGoods />
      </section>

      {/* 하단 네브바 */}
      <NavBar />
    </div>
  );
}

export default Display;