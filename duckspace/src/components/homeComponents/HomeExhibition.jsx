import { useNavigate } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

function HomeExhibition({ exhibitions = [] }) {
  const navigate = useNavigate();
  const [big, ...rest] = exhibitions;
  const smalls = rest.slice(0, 2);

  if (!big) return null;

  return (
    <section className="mt-7 px-5">
      {/* 타이틀 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[18px] font-medium text-black">
          다른 유저 전시장
        </h2>

        <button
          type="button"
          onClick={() => navigate("/search")}
          className="flex items-center text-[16px] text-[#A2A2A2] cursor-pointer"
        >
          더보기
          <IoChevronForward size={20} />
        </button>
      </div>

      {/* 전시장 카드 */}
      <div className="flex gap-4">
        {/* 왼쪽 큰 카드 */}
        <div
          onClick={() => navigate("/search")}
          className="h-[300px] w-[230px] shrink-0 overflow-hidden rounded-[8px] cursor-pointer bg-[#CDDCF7]"
        >
          {big.thumbnailUrl && (
            <img
              src={big.thumbnailUrl}
              alt={big.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* 오른쪽 작은 카드 2개 */}
        <div className="flex flex-col gap-4">
          {smalls.map((exhibition) => (
            <div
              key={exhibition.exhibitionId}
              onClick={() => navigate("/search")}
              className="h-[140px] w-[110px] overflow-hidden rounded-[8px] cursor-pointer bg-[#CDDCF7]"
            >
              {exhibition.thumbnailUrl && (
                <img
                  src={exhibition.thumbnailUrl}
                  alt={exhibition.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeExhibition;
