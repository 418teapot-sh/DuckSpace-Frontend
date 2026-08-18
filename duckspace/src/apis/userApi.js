import api from "./api";

export const getMyProfile = async () => {
  const response = await api.get("/api/users/me");
  return response.data;
};
// 주석 태스트
export const updateMyProfile = async ({
  nickname,
  profileImageUrl,
}) => {
  const response = await api.patch(
    "/api/users/me",
    {
      nickname,
      profileImageUrl,
    }
  );

  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await api.get(
    `/api/users/${userId}`
  );

  return response.data;
};