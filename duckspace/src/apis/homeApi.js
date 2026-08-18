// src/apis/homeApi.js
import api from "./api";

// 비로그인도 호출 가능. 로그인 상태면 popularExhibitions의 likedByMe가 실제 값으로 옵니다.
export const getHome = async () => {
  const res = await api.get("/api/home");
  return res.data.data;
};
