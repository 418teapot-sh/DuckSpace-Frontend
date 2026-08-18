// src/apis/userApi.js
import api from "./api";

export const getMyProfile = async () => {
  const res = await api.get("/api/users/me");
  return res.data.data;
};

export const getUserProfile = async (userId) => {
  const res = await api.get(`/api/users/${userId}`);
  return res.data.data;
};

export const updateMyProfile = async ({ nickname, profileImageUrl }) => {
  const res = await api.patch("/api/users/me", { nickname, profileImageUrl });
  return res.data.data;
};
