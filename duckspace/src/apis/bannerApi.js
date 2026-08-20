import api from "./api";

export const getBanners = async () => {
  const response = await api.get("/api/banners");
  return response.data.data;
};