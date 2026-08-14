import { IoHeart, IoChatbubbleOutline } from "react-icons/io5";

function DuckTalkChatCard({ post }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#F4F4F4] bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
      {/* 상단 작성자 정보 & 신고하기 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-[#DEDEDE]" />
          <div className="flex items-center gap-3">
            <span className="text-[16px] font-semibold text-[#171617]">
              {post.author}
            </span>
            <span className="text-[12px] text-[#858485]">{post.date}</span>
          </div>
        </div>
        <button
          type="button"
          className="text-[12px] text-[#858485] cursor-pointer"
        >
          신고하기
        </button>
      </div>

      {/* 본문 내용 */}
      <p className="text-[14px] leading-[21px] text-[#545454] whitespace-pre-line">
        {post.content}
      </p>

      {/* 하단 좋아요 & 댓글 수 */}
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
    </div>
  );
}

export default DuckTalkChatCard;