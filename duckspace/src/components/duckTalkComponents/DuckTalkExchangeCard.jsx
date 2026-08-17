import { useNavigate } from "react-router-dom";
import {
  IoHeartOutline,
  IoChatbubbleOutline,
  IoEllipsisHorizontal,
  IoSwapHorizontal,
} from "react-icons/io5";

function DuckTalkExchangeCard({ post, mode = "feed" }) {
  const navigate = useNavigate();

  // 1. 백엔드 필드 매핑 및 기본값 안전 처리
  const authorName = post.authorNickname || post.author || "사용자";
  const title = post.title || post.content || "교환 글";
  const offeredItem = post.offeredItemName || post.goods?.title || "제시 굿즈";
  const wantedItem = post.wantedItemName || post.goods?.series || "희망 굿즈";
  const isCompleted = post.status === "COMPLETED" || post.isCompleted;
  
  // 날짜 포맷 (2026-08-17T... -> 2026.08.17)
  const formattedDate = post.createdAt
    ? post.createdAt.slice(0, 10).replace(/-/g, ".")
    : post.date || "";

  const tagList = Array.isArray(post.tags)
    ? post.tags
    : post.tag
    ? [post.tag]
    : [];

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    if (post.mine) {
      navigate("/ducktalk/mypage");
    } else if (post.authorId) {
      navigate(`/ducktalk/user?id=${post.authorId}`);
    }
  };

  // 상세 페이지 이동
  const handleCardClick = () => {
    navigate(`/ducktalk/exchange/detail/${post.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="flex flex-col gap-4 rounded-xl border border-[#F4F4F4] bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px] cursor-pointer hover:border-[#A6C3F8] transition-all"
    >
      {/* 1. 상단 작성자 정보 */}
      <div className="flex items-center justify-between">
        <div
          onClick={handleAuthorClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="h-7 w-7 rounded-full bg-[#E5E5E5] flex items-center justify-center text-xs font-semibold text-[#858485]">
            {authorName.slice(0, 1)}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-semibold text-[#171617]">
              {authorName}
            </span>
            <span className="text-[12px] text-[#858485]">{formattedDate}</span>
          </div>
        </div>

        {mode === "myPage" ? (
          <button 
            type="button" 
            onClick={(e) => e.stopPropagation()} 
            className="text-[#A2A2A2] cursor-pointer"
          >
            <IoEllipsisHorizontal size={20} />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              alert("게시글이 신고되었습니다.");
            }}
            className="text-[12px] text-[#858485] cursor-pointer hover:underline"
          >
            신고하기
          </button>
        )}
      </div>

      {/* 2. 교환 제목 / 내용 */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[16px] font-semibold leading-[22px] text-[#171617] line-clamp-1">
          {title}
        </h3>

        {tagList.length > 0 && (
          <div className="flex flex-wrap gap-2 text-[13px] font-normal leading-[18px] text-[#2F78FD]">
            {tagList.map((tag, idx) => (
              <span key={idx}>#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* 3. 교환 물품 카드 (내 굿즈 <-> 원하는 굿즈) */}
      <div className="flex items-center justify-between rounded-lg border border-white/60 bg-[#F9FAFB] p-3.5 shadow-sm">
        <div className="flex flex-col items-center flex-1">
          <span className="text-[11px] font-medium text-[#858485] mb-1">보유 굿즈</span>
          <span className="text-[14px] font-semibold text-[#171617] text-center truncate max-w-[120px]">
            {offeredItem}
          </span>
        </div>

        <IoSwapHorizontal size={20} className="text-[#2F78FD] shrink-0 mx-2" />

        <div className="flex flex-col items-center flex-1">
          <span className="text-[11px] font-medium text-[#858485] mb-1">희망 굿즈</span>
          <span className="text-[14px] font-semibold text-[#2F78FD] text-center truncate max-w-[120px]">
            {wantedItem}
          </span>
        </div>
      </div>

      {/* 4. 좋아요 / 댓글 수 */}
      <div className="flex items-center gap-3 text-[#545454]">
        <div className="flex items-center gap-1.5">
          <IoHeartOutline size={18} className="text-[#545454]" />
          <span className="text-[13px] font-semibold">{post.likeCount ?? 0}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <IoChatbubbleOutline size={17} className="text-[#545454]" />
          <span className="text-[13px] font-semibold">{post.commentCount ?? 0}</span>
        </div>
      </div>

      {/* 5. 하단 버튼 영역 */}
      <div className="flex gap-4 pt-1" onClick={(e) => e.stopPropagation()}>
        {isCompleted ? (
          <div className="flex h-11 flex-1 items-center justify-center rounded-lg bg-[#F4F4F4] border border-[#DEDEDE] text-[14px] font-semibold text-[#858485]">
            교환 완료
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate(`/ducktalk/exchange/detail/${post.id}`)}
            className="flex h-11 flex-1 items-center justify-center rounded-lg bg-[#2F78FD] border border-[#2F78FD] text-[14px] font-semibold text-white shadow-sm hover:bg-[#1E67EC] cursor-pointer transition-all"
          >
            교환 상세 / 신청하기
          </button>
        )}
      </div>
    </div>
  );
}

export default DuckTalkExchangeCard;