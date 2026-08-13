import { IoChevronForward } from "react-icons/io5";
import { homeMockData } from "../../data/homeMockData";

function HomePopupCard() {
  const popupList = homeMockData.slice(0, 2);

  return (
    <section className="mt-6 px-5">
      {/* 타이틀 영역 */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[18px] font-medium text-black">
          다가오는 팝업
        </h2>

        <button
          type="button"
          className="flex items-center text-[16px] text-[#A2A2A2]"
        >
          더보기
          <IoChevronForward size={20} />
        </button>
      </div>

      {/* 팝업 카드 */}
      <div className="flex gap-3">
        {popupList.map((popup) => (
          <div
            key={popup.id}
            className="
              h-[110px]
              w-[180px]
              overflow-hidden
              rounded-[8px]
              bg-[#CDDCF7]
            "
          >
            <img
              src={popup.imageUrl}
              alt={popup.title}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePopupCard;