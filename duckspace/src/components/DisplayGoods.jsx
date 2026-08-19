import { IoChevronForward, IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGoodsStore } from "../store/goodsStore";

function DisplayGoods({ goods = [], exhibitionId, readOnly = false }) {
    const navigate = useNavigate();
    //const goods = useGoodsStore((state) => state.goods);

  return (
    <div className=" pb-5">
      {/* 제목 + 모두보기 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">전시된 굿즈</h2>

        <button
          onClick={() =>
            navigate("/display/list", {
              state: { mode: "view", exhibitionId, },
            })
          }
          className="flex cursor-pointer items-center text-sm text-[#A2A2A2]"
        >
          모두보기
          <IoChevronForward size={18} />
        </button>
      </div>

      {/* 굿즈 미리보기 */}
      <div className="flex gap-3 overflow-x-auto">
        {goods.map((item) => (
          <div
            key={item.itemId}
            className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl border border-[#EEEEEE]"
          >
            <img
              src={item.imageUrl}
              alt={item.itemName}
              className="h-[55px] w-[55px] object-contain"
            />
          </div>
        ))}

        {/* 새 굿즈 등록 — 남의 장식장에는 못 넣으니 숨긴다 */}
        {!readOnly && (
          <button
            className="flex h-[60px] w-[60px] shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#EEEEEE]"
            onClick={() =>
              navigate("/display/upload", {
              state: { exhibitionId },
              })
            }
          >
            <IoAdd size={30} />
          </button>
        )}
      </div>
    </div>
  );
}

export default DisplayGoods;