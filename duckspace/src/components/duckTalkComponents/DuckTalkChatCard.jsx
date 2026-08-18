import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoHeartOutline,
  IoChatbubbleOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { reportPost, deletePost, getPostDetail } from "../../apis/postApi";

function DuckTalkChatCard({ post, mode = "feed", onRefresh }) {
  const navigate = useNavigate();
  const [detailImage, setDetailImage] = useState(null);

  const isMe = mode === "myPage";

  // 마이페이지 목록 API는 첨부 이미지를 안 주므로, 카드마다 상세 조회로 채움
  useEffect(() => {
    if (mode !== "myPage") return;
    getPostDetail(post.id)
      .then((detail) => setDetailImage(detail?.imageUrls?.[0] || null))
      .catch((error) => console.error("잡담 글 상세 조회 실패:", error));
  }, [mode, post.id]);

  // 게시글 상세/댓글 화면으로 이동
  const handleCardClick = () => {
    navigate(`/ducktalk/post/${post.id}`);
  };

  // 게시글 신고
  const handleReport = async (e) => {
    e.stopPropagation();
    const reason = window.prompt("신고 사유를 입력해주세요. (선택 사항)", "");
    if (reason === null) return;
    try {
      await reportPost(post.id, { reason });
      alert("신고가 접수되었습니다.");
    } catch (error) {
      console.error("게시글 신고 실패:", error);
      alert("신고 접수 중 오류가 발생했습니다.");
    }
  };

  // 게시글 삭제 (내 글)
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    try {
      await deletePost(post.id);
      onRefresh?.();
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  const authorName = post.authorNickname || "사용자";
  const formattedDate = post.createdAt
    ? post.createdAt.slice(0, 10).replace(/-/g, ".")
    : "";
  const handleAuthorClick = (e) => {
    e.stopPropagation();
    if (post.mine) {
      navigate("/ducktalk/mypage");
    } else if (post.authorId) {
      navigate(`/ducktalk/user?id=${post.authorId}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col gap-3 rounded-xl border border-[#F4F4F4] bg-white/75 p-5 shadow-[0_15px_40px_rgba(205,205,205,0.08)] backdrop-blur-[10px] cursor-pointer hover:border-[#A6C3F8] transition-all"
    >
      {/* 1. 상단 작성자 정보 (클릭 시 이동) */}
      <div className="flex items-center justify-between">
        <div
          onClick={handleAuthorClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="h-6 w-6 rounded-full bg-[#DEDEDE]" />
          <div className="flex items-center gap-3">
            <span className="text-[16px] font-semibold text-[#171617]">
              {/*{post.author} //// 여기!!!! */} 
              {authorName}
            </span>
            <span className="text-[12px] text-[#858485]">
              {/*{post.date} //// 여기!!!! */} 
              {formattedDate}
            </span>
          </div>
        </div>

        {isMe ? (
          <button
            type="button"
            onClick={handleDelete}
            className="text-[#A2A2A2] cursor-pointer"
            aria-label="게시글 삭제"
          >
            <IoEllipsisHorizontal size={20} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReport}
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

      {/* 3. 본문 첨부 이미지 */}
      {(detailImage || post.image) && (
        <div className="mt-1 w-[200px] h-[184px] overflow-hidden rounded-lg border border-[#EEEEEE]">
          <img
            src={detailImage || post.image}
            alt="첨부 이미지"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* 4. 하단 좋아요 & 댓글 */}
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