import {
  IoCheckmarkCircle,
  IoHeart,
  IoChatbubbleOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";

function DuckTalkExchangeCard({ post }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#F4F4F4] bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
      {/* 1. 상단 작성자 정보 & 메뉴 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-[#DEDEDE]" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-[16px] font-semibold text-[#171617]">
                {post.author}
              </span>
              <div className="flex items-center gap-0.5 text-[#2F78FD]">
                <IoCheckmarkCircle size={16} />
                <span className="text-[11px] font-semibold">{post.score}</span>
              </div>
            </div>
            <span className="text-[12px] text-[#858485]">{post.date}</span>
          </div>
        </div>

        <button type="button" className="text-[#A2A2A2] cursor-pointer">
          <IoEllipsisHorizontal size={20} />
        </button>
      </div>

      {/* 2. 교환 본문 및 태그 */}
      <div className="flex flex-col gap-2">
        <p className="text-[14px] leading-[21px] text-[#545454]">
          {post.content}
        </p>
        <span className="text-[14px] text-[#2F78FD]">{post.tag}</span>
      </div>

      {/* 3. 교환 물품 카드 */}
      <div className="flex items-center gap-6 rounded-lg border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-[10px]">
        <div className="h-[124px] w-[124px] shrink-0 overflow-hidden rounded-lg border border-[#DEDEDE]">
          <img
            src={post.goods.image}
            alt={post.goods.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] font-semibold leading-[25.2px] text-[#171617]">
            {post.goods.title}
          </h3>
          <p className="text-[16px] leading-[24px] text-[#545454]">
            {post.goods.series}
          </p>
          <p className="text-[16px] leading-[24px] text-[#A2A2A2]">
            {post.goods.status}
          </p>
        </div>
      </div>

      {/* 4. 좋아요 / 댓글 */}
      <div className="flex items-center gap-3 text-[#545454]">
        <div className="flex items-center gap-1">
          <IoHeart size={18} />
          <span className="text-[14px] font-semibold">{post.likeCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <IoChatbubbleOutline size={18} />
          <span className="text-[14px] font-semibold">{post.commentCount}</span>
        </div>
      </div>

      {/* 5. 피그마 지정 3종 버튼 분기 */}
      <div className="flex gap-4 pt-1">
        {post.isCompleted ? (
          // 상태 1: 교환 완료
          <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#F4F4F4] border border-[#DEDEDE] text-[14px] font-semibold text-[#858485]">
            교환 완료
          </div>
        ) : post.requestCount > 0 ? (
          // 상태 2: 교환 신청 건수가 있는 경우
          <>
            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center rounded-lg bg-white border border-[#A6C3F8] text-[14px] font-semibold text-[#2F78FD] cursor-pointer"
            >
              교환 신청 {post.requestCount}건
            </button>
            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#5791FB] border border-[#2F78FD] text-[14px] font-semibold text-white cursor-pointer"
            >
              교환 완료 하기
            </button>
          </>
        ) : (
          // 상태 3: 교환 신청 0건
          <>
            <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#F4F4F4] border border-[#DEDEDE] text-[14px] font-semibold text-[#858485]">
              교환 신청 0건
            </div>
            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#5791FB] border border-[#2F78FD] text-[14px] font-semibold text-white cursor-pointer"
            >
              교환 완료 하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DuckTalkExchangeCard;