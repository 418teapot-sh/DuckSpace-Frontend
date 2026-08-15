import { useNavigate } from "react-router-dom";
import {
  IoHeartOutline,
  IoChatbubbleOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";

function DuckTalkChatCard({ post }) {
  const navigate = useNavigate();
  const isMe = post.author === "나";

  // 작성자 클릭 시 프로필 페이지로 이동
  const handleAuthorClick = () => {
    if (post.author === "다른사람") {
      navigate("/ducktalk/user");
    } else if (post.author === "나") {
      navigate("/ducktalk/mypage");
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#F4F4F4] bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px]">
      {/* 1. 상단 작성자 정보 & 신고하기 */}
      <div className="flex items-center justify-between">
        <div
          onClick={handleAuthorClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="h-6 w-6 rounded-full bg-[#DEDEDE]" />
          <div className="flex items-center gap-3">
            <span className="text-[16px] font-semibold text-[#171617]">
              {post.author}
            </span>
            <span className="text-[12px] text-[#858485]">{post.date}</span>
          </div>
        </div>

        {isMe ? (
          <button type="button" className="text-[#A2A2A2] cursor-pointer">
            <IoEllipsisHorizontal size={20} />
          </button>
        ) : (
          <button
            type="button"
            className="text-[12px] text-[#858485] cursor-pointer hover:underline"
          >
            신고하기
          </button>
        )}
      </div>

      {/* 2. 본문 내용 */}
      <p className="text-[14px] leading-[21px] text-[#545454] whitespace-pre-line">
        {post.content}
      </p>

      {/* 3. 본문 첨부 이미지 (있을 때만 렌더링) */}
      {post.image && (
        <div className="mt-1 w-[200px] h-[184px] overflow-hidden rounded-lg border border-[#EEEEEE]">
          <img
            src={post.image}
            alt="첨부 이미지"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* 4. 하단 좋아요 & 댓글 수 */}
      <div className="flex items-center gap-3 text-[#545454] pt-1">
        <div className="flex items-center gap-1.5">
          <IoHeartOutline size={20} className="text-[#545454]" />
          <span className="text-[14px] font-semibold leading-[21px]">{post.likeCount}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <IoChatbubbleOutline size={18} className="text-[#545454]" />
          <span className="text-[14px] font-semibold leading-[21px]">{post.commentCount}</span>
        </div>
      </div>
    </div>
  );
}

export default DuckTalkChatCard;