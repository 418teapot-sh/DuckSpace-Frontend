import api from "./api";

// 닉네임으로 유저 검색. keyword가 비어있으면 빈 목록.
export const searchUsers = async ({ keyword, limit } = {}) => {
  const params = {};
  if (keyword) params.keyword = keyword;
  if (limit) params.limit = limit;

  const res = await api.get("/api/search/users", { params });

  return res.data.data;
};

// 본인이 클릭한 검색 결과 최근 내역(최대 3개)
export const getUserSearchHistory = async () => {
  const res = await api.get("/api/search/users/history");

  return res.data.data;
};

// 검색 결과에서 유저를 클릭했을 때 호출 (타이핑만으로는 기록 안 됨)
export const recordUserSearchHistory = async (targetUserId) => {
  const res = await api.post("/api/search/users/history", {
    targetUserId,
  });

  return res.data.data;
};

export const clearUserSearchHistory = async () => {
  await api.delete("/api/search/users/history");
};
