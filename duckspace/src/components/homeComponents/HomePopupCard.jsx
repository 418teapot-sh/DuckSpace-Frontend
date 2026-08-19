import { useNavigate } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

function HomePopupCard({ popups = [] }) {
  const navigate = useNavigate();
  const popupList = popups.slice(0, 2);

  if (popupList.length === 0) return null;

  return (
    <section className="mt-6 px-5">
      {/* 타이틀 영역 */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[18px] font-medium text-black">
          다가오는 팝업
        </h2>

        <button
          type="button"
          onClick={() => navigate("/popup")}
          className="flex items-center text-[16px] text-[#A2A2A2] cursor-pointer"
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
              cursor-pointer
            "
            onClick={() => navigate(`/popup/detail?id=${popup.id}`)}
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
