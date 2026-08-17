import { IoChevronBack, IoEllipsisHorizontal, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DisplayEdit from "../components/DisplayEdit";
import DisplayGoods from "../components/DisplayGoods";
import NavBar from "../components/NavBar";

import { createExhibition } from "../apis/displayApi";

function Display() {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([
    {
      exhibitionId: "local -1",
      name: "장식장 1",
      themeCode: "BASIC",
    },
  ]);

  const [activeExhibitionId, setActiveExhibitionId] = useState("local -1");

  const handleAddExhibition = async () => {
    try {
      const nextNumber = exhibitions.length + 1;

      const result = await createExhibition(
        `장식장 ${nextNumber}`,
        "BASIC"
      );

      const newExhibition = result.data;

      setExhibitions((prev) => [
        ...prev,
        newExhibition,
      ]);

      setActiveExhibitionId(
        newExhibition.exhibitionId
      );
    } catch (error) {
      console.error(
        "장식장 생성 실패:",
        error.response?.data || error
      );
    }
  };

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
      <section className="px-7">
        <div className="flex border-b border-[#EEEEEE]">
          {exhibitions.map((exhibition) => (
            <button
              key={exhibition.exhibitionId}
              onClick={() =>
                setActiveExhibitionId(
                  exhibition.exhibitionId
                )
              }
              className={`
                flex-1
                py-3
                text-[16px]
                font-medium
                cursor-pointer
                ${
                  activeExhibitionId ===
                  exhibition.exhibitionId
                    ? "border-b-2 border-[#5791FB] text-[#5791FB]"
                    : "text-[#A2A2A2]"
                }
              `}
            >
              {exhibition.name}
            </button>
          ))}

          {/* 새 장식장 추가 */}
          <button
            type="button"
            onClick={handleAddExhibition}
            className="
              flex-1
              cursor-pointer
              py-3
              text-[26px]
              text-[#A2A2A2]
            "
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