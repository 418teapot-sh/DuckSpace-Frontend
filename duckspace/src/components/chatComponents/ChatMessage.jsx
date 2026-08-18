function ChatMessage({
  message,
  partnerNickname,
  profileImage,
}) {
  const isMine = message.mine ?? message.isMine ?? false;

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (isMine) {
    return (
      <div className="flex justify-end">
        <div className="flex items-end gap-2 max-w-[80%]">
          <span className="text-[11px] text-[#A2A2A2] shrink-0">
            {formatTime(message.createdAt)}
          </span>

          <div className="rounded-[100px] bg-[#2F78FD] px-[20px] py-[8px] text-[14px] text-[#FCFCFC] break-all">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 max-w-[80%]">
      <img
        src={profileImage}
        alt="프로필"
        className="h-[36px] w-[36px] shrink-0 rounded-full object-cover bg-gray-100 mt-1"
      />

      <div>
        <p className="mb-1 text-[13px] font-medium text-black">
          {partnerNickname}
        </p>

        <div className="flex items-end gap-2">
          <div className="rounded-[100px] bg-[#DEDEDE] px-[20px] py-[8px] text-[14px] text-[#171617] break-all">
            {message.content}
          </div>

          <span className="text-[11px] text-[#A2A2A2] shrink-0">
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;