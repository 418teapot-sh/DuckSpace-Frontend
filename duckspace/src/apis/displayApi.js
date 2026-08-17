import api from "./api";

export const createExhibition = async (name, themeCode) => {
  const response = await api.post("/api/exhibitions", {
    name,
    themeCode,
  });

  return response.data;
};