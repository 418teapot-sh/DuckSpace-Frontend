import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

function DuckTalkProfile({ profile, isMe = true }) {
  // 팔로우 상태 토글 (다른 사람 프로필용)
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing || false);

  return (
    <div className="flex flex-col items-center justify-center pt-5 pb-3 px-5">
      {/* 아바타 원 */}
      <div className="h-20 w-20 rounded-full bg-[#858485] mb-3 overflow-hidden">
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* 이름 & 파란 체크 */}
      <div className="flex items-center gap-1 mb-1">
        <IoCheckmarkCircle className="text-[#2F78FD] text-lg" />
        <span className="text-[16px] font-semibold leading-[20.8px] text-[#545454]">
          {profile.name}
        </span>
      </div>

      {/* 신뢰도 | 후기 */}
      <div className="flex items-center gap-1 text-[14px] font-semibold leading-[21px] text-[#2F78FD] mb-2">
        <span>신뢰도 {profile.score}</span>
        <span>|</span>
        <span>후기 {profile.reviewCount}개</span>
      </div>

      {/* 팔로잉 / 팔로워 */}
      <div className="flex items-center gap-2 text-[12px] font-normal leading-[19.2px] text-[#A2A2A2] mb-3">
        <span>팔로잉 {profile.followingCount}</span>
        <span>팔로워 {profile.followerCount}</span>
      </div>

      {/* 버튼 (내 글: 프로필 편집 / 타인 글: 팔로우/팔로잉 토글) */}
      <div>
        {isMe ? (
          <button
            type="button"
            className="h-6 px-4 flex items-center justify-center rounded bg-[#FCFCFC] border border-[#A6C3F8] text-[11px] font-semibold leading-[17.6px] text-[#2F78FD] cursor-pointer"
          >
            프로필 편집
          </button>
        ) : isFollowing ? (
          <button
            type="button"
            onClick={() => setIsFollowing(false)}
            className="h-6 px-4 flex items-center justify-center rounded bg-[#FCFCFC] border border-[#A6C3F8] text-[11px] font-semibold leading-[17.6px] text-[#2F78FD] cursor-pointer"
          >
            팔로잉
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsFollowing(true)}
            className="h-6 px-4 flex items-center justify-center rounded bg-[#5791FB] border border-[#2F78FD] text-[11px] font-semibold leading-[17.6px] text-white cursor-pointer"
          >
            팔로우
          </button>
        )}
      </div>
    </div>
  );
}

export default DuckTalkProfile;