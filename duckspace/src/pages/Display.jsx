import { IoChevronBack, IoEllipsisHorizontal, IoHeartOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import DisplayEdit from "../components/DisplayEdit";
import DisplayGoods from "../components/DisplayGoods";
import NavBar from "../components/NavBar";

import { useDisplayStore } from "../store/displayStore";

import { createExhibition , getMyExhibitions, getExhibitionDetail,  } from "../apis/displayApi";

import { getMyProfile, getUserProfile } from "../apis/userApi";


function Display() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewExhibitionId = searchParams.get("id");
  const isOwnView = !viewExhibitionId;

  const [profile, setProfile] = useState(null);
  const [mine, setMine] = useState(isOwnView);
  const [viewingExhibitionName, setViewingExhibitionName] = useState("");

  const setEditingItems = useDisplayStore(
    (state) => state.setEditingItems
  );
  const handleGoodsDeleted = (itemId) => {
    setDisplayGoods((prev) =>
      prev.filter((item) => item.itemId !== itemId)
    );

    const currentItems =
      useDisplayStore.getState().editingItems;

    setEditingItems(
      currentItems.filter(
        (item) => item.itemId !== itemId
      )
    );
  };

  const [exhibitions, setExhibitions] = useState([]);
  const [activeExhibitionId, setActiveExhibitionId] = useState(
    viewExhibitionId ? Number(viewExhibitionId) : null
  );
  const [displayGoods, setDisplayGoods] = useState([]);
  const [activeThemeCode, setActiveThemeCode] = useState("BASIC");

  // 내 프로필 조회 (내 장식장을 볼 때만 — 남의 장식장은 상세 조회 후 소유자 프로필을 따로 불러옴)
  useEffect(() => {
    if (!isOwnView) return;

    const fetchMyProfile = async () => {
      try {
        const result = await getMyProfile();

        console.log("내 프로필:", result);

        setProfile(result);
      } catch (error) {
        console.error(
          "내 프로필 조회 실패:",
          error.response?.data || error
        );
      }
    };

    fetchMyProfile();
  }, [isOwnView]);

  // 내 장식장 목록 (내 장식장을 볼 때만). 남의 장식장은 URL의 exhibitionId 하나만 본다(초기 state에서 이미 세팅됨).
  useEffect(() => {
    if (!isOwnView) return;

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
  }, [isOwnView]);


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

        const detail = result.data;
        setActiveThemeCode(detail.themeCode || "BASIC");
        const items = detail.items || [];
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

        // 남의 장식장이면 상세 응답의 ownerId로 그 사람 프로필을 따로 불러온다
        if (!isOwnView) {
          setMine(detail.mine);
          setViewingExhibitionName(detail.name || "");
          try {
            const ownerProfile = await getUserProfile(detail.ownerId);
            setProfile(ownerProfile);
          } catch (error) {
            console.error(
              "장식장 소유자 프로필 조회 실패:",
              error.response?.data || error
            );
          }
        }
      } catch (error) {
        console.error(
          "장식장 상세 조회 실패:",
          error.response?.data || error
        );
      }
    };

    fetchExhibitionDetail();
  }, [activeExhibitionId, setEditingItems, isOwnView]);

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
          {isOwnView ? "장식장" : viewingExhibitionName || "장식장"}
        </h1>
      </header>

      {/* 프로필 영역 */}
      <section className="flex items-center justify-between px-7 py-5">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-full bg-[#F4F4F4]">
            {profile?.profileImageUrl && (
              <img
                src={profile.profileImageUrl}
                alt={profile.nickname}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div>
            <p className="text-[20px] font-semibold text-black">
              {profile?.nickname || "사용자"}
            </p>

            <p className="mt-1 text-[14px] text-[#A2A2A2]">
              팔로워 {profile?.followerCount ?? 0} | 팔로잉 {profile?.followingCount ?? 0}
            </p>
          </div>
        </div>

        {isOwnView && (
          <button className="cursor-pointer text-2xl text-[#A2A2A2]">
            <IoEllipsisHorizontal />
          </button>
        )}
      </section>

      {/* 탭 영역 — 남의 장식장은 목록 조회 API가 없어 클릭한 하나만 보여주므로 탭 자체를 숨긴다 */}
      {isOwnView && (
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
      )}

      {/* 전시장 */}
      <section className="px-7 pt-3">
        <DisplayEdit exhibitionId={activeExhibitionId} readOnly={!mine} themeCode={activeThemeCode} />
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
          goods={displayGoods}
          exhibitionId={activeExhibitionId}
          readOnly={!mine}
          onDeleted={handleGoodsDeleted}
        />
      </section>

      {/* 하단 네브바 */}
      <NavBar />
    </div>
  );
}

export default Display;