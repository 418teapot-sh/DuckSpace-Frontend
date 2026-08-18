import api from "./api";

// 팔로우
export const followUser = async (userId) => {
  const response = await api.post(
    `/api/users/${userId}/follow`
  );

  return response.data;
};

// 언팔로우
export const unfollowUser = async (userId) => {
  const response = await api.delete(
    `/api/users/${userId}/follow`
  );

  return response.data;
};

// 팔로잉 목록
export const getFollowing = async (userId) => {
  const response = await api.get(
    `/api/users/${userId}/following`
  );

  return response.data;
};

// 팔로워 목록
export const getFollowers = async (userId) => {
  const response = await api.get(
    `/api/users/${userId}/followers`
  );

  return response.data;
};