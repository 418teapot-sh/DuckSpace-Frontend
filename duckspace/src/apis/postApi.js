import api from "./api";

// ===== 이미지 업로드 =====

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/api/posts/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // 백엔드가 반환한 CDN 이미지 주소 (https://...)
  return res.data.data.imageUrl;
};

// ===== 잡담 게시판 =====

export const getCasualPosts = async ({ keyword, cursor, size = 10 } = {}) => {
  const params = { size };
  if (keyword) params.keyword = keyword;
  if (cursor) params.cursor = cursor;
  const res = await api.get("/api/posts/casual", { params });
  return res.data.data;
};

export const createCasualPost = async ({ content, hashtags = [], images = [] }) => {
  const res = await api.post("/api/posts/casual", {
    content,
    hashtags,
    imageUrls: images,
  });
  return res.data.data;
};

// ===== 교환 게시판 =====

export const getExchangePosts = async ({ keyword, cursor, size = 10 } = {}) => {
  const params = { size };
  if (keyword) params.keyword = keyword;
  if (cursor) params.cursor = cursor;
  const res = await api.get("/api/posts/exchange", { params });
  return res.data.data;
};

export const createExchangePost = async ({
  title,
  content,
  offeredItem,
  wantedItem,
  preferredPopupName,
  preferredDate,
  preferredTime,
  extraCondition,
}) => {
  const res = await api.post("/api/posts/exchange", {
    title,
    content,
    offeredItem,
    wantedItem,
    preferredPopupName,
    preferredDate,
    preferredTime,
    extraCondition,
  });
  return res.data.data;
};

export const completeExchange = async (postId) => {
  const res = await api.patch(`/api/posts/exchange/${postId}/complete`);
  return res.data.data;
};

// ===== 게시글 공통 =====

export const getPostDetail = async (postId) => {
  const res = await api.get(`/api/posts/${postId}`);
  return res.data.data;
};

/** 잡담 글 전용 — 교환 글은 수정 없이 completeExchange만 가능합니다. */
export const updatePost = async (postId, { content, hashtags, images }) => {
  const res = await api.patch(`/api/posts/${postId}`, {
    content,
    hashtags,
    imageUrls: images,
  });
  return res.data.data;
};

export const deletePost = async (postId) => {
  await api.delete(`/api/posts/${postId}`);
};

export const likePost = async (postId) => {
  await api.post(`/api/posts/${postId}/like`);
};

export const unlikePost = async (postId) => {
  await api.delete(`/api/posts/${postId}/like`);
};

export const reportPost = async (postId, { reason }) => {
  await api.post(`/api/posts/${postId}/report`, { reason });
};

// ===== 댓글 =====

export const getComments = async (postId) => {
  const res = await api.get(`/api/posts/${postId}/comments`);
  return res.data.data;
};

export const createComment = async (postId, { content, parentId, secret }) => {
  const res = await api.post(`/api/posts/${postId}/comments`, {
    content,
    parentId: parentId || null,
    secret: secret || false,
  });
  return res.data.data;
};

export const deleteComment = async (commentId) => {
  await api.delete(`/api/comments/${commentId}`);
};

// ===== 교환 신청 =====

export const applyExchange = async (
  postId,
  { offeredItemName, offeredImageUrl, offeredBrand, offeredCondition, message }
) => {
  const res = await api.post(`/api/posts/exchange/${postId}/applications`, {
    offeredItemName,
    offeredImageUrl,
    offeredBrand,
    offeredCondition,
    message,
  });
  return res.data.data;
};

export const getApplications = async (filter = "sent") => {
  const res = await api.get("/api/applications", { params: { filter } });
  return res.data.data;
};

export const acceptApplication = async (applicationId) => {
  await api.patch(`/api/applications/${applicationId}/accept`);
};

export const rejectApplication = async (applicationId) => {
  await api.patch(`/api/applications/${applicationId}/reject`);
};

export const completeApplication = async (applicationId) => {
  await api.patch(`/api/applications/${applicationId}/complete`);
};

export const cancelApplication = async (applicationId) => {
  await api.delete(`/api/applications/${applicationId}`);
};