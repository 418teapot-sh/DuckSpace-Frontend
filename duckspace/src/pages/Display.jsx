import { IoChevronBack, IoEllipsisHorizontal, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import DisplayEdit from "../components/DisplayEdit";
import DisplayGoods from "../components/DisplayGoods";
import NavBar from "../components/NavBar";

import { useDisplayStore } from "../store/displayStore";

import { createExhibition , getMyExhibitions, getExhibitionDetail } from "../apis/displayApi";


function Display() {
  const navigate = useNavigate();
  
  const setEditingItems = useDisplayStore(
    (state) => state.setEditingItems
  );

  
  const [exhibitions, setExhibitions] = useState([]);
  const [activeExhibitionId, setActiveExhibitionId] = useState(null);
  const [displayGoods, setDisplayGoods] = useState([]);

  useEffect(() => {
    const fetchMyExhibitions = async () => {
      try {
        const result = await getMyExhibitions();

        console.log("내 장식장 목록:", result.data);

        const exhibitionList = result.data || [];

        setExhibitions(exhibitionList);

        if (exhibitionList.length > 0) {
          setActiveExhibitionId(
            exhibitionList[0].exhibitionId
          );
        }
      } catch (error) {
        console.error(
          "장식장 목록 조회 실패:",
          error.response?.data || error
        );
      }
    };

    fetchMyExhibitions();
  }, []);
  
  
  const handleAddExhibition = async () => {
    try {
      console.log("장식장 추가 버튼 클릭");
      const nextNumber = exhibitions.length + 1;

      const result = await createExhibition(
        `장식장 ${nextNumber}`,
        "BASIC"
      );
      console.log("장식장 생성 응답:", result);

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
  useEffect(() => {
    if (!activeExhibitionId) return;

    const fetchExhibitionDetail = async () => {
      try {
        const result = await getExhibitionDetail(
          activeExhibitionId
          
        );

        const items = result.data.items || [];
        setDisplayGoods(items);
        const convertedItems = items.map(
          (item) => ({
            id: item.itemId,
            itemId: item.itemId,
            src: item.imageUrl,

            x: item.posX * 360,
            y: item.posY * 400,
            width: item.width * 360,
            height: item.height * 400,

            rotation: item.rotation ?? 0,
          })
        );

        setEditingItems(convertedItems);
      } catch (error) {
        console.error(
          "장식장 상세 조회 실패:",
          error.response?.data || error
        );
      }
    };

    fetchExhibitionDetail();
  }, [activeExhibitionId, setEditingItems]);

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
        <div className="flex overflow-x-auto border-b border-[#EEEEEE]">
          {exhibitions.map((exhibition) => (
            <button
              key={exhibition.exhibitionId}
              onClick={() =>
                setActiveExhibitionId(
                  exhibition.exhibitionId
                )
              }
              className={`
                shrink-0
                min-w-[120px]
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
              shrink-0
              min-w-[120px]
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
        <DisplayEdit exhibitionId={activeExhibitionId} />
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
        <DisplayGoods
          
        />
      </section>

      {/* 하단 네브바 */}
      <NavBar />
    </div>
  );
}

export default Display;