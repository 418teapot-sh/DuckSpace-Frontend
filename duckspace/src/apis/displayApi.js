import api from "./api";

export const createExhibition = async (name, themeCode) => {
  const response = await api.post("/api/exhibitions", {
    name,
    themeCode,
  });

  return response.data;
};

export const getMyExhibitions = async () => {
  const response = await api.get("/api/exhibitions/me");

  return response.data;
};

export const getExhibitionDetail = async (exhibitionId) => {
  const response = await api.get(
    `/api/exhibitions/${exhibitionId}`
  );

  return response.data;
};

export const updateExhibitionItemPosition = async (
  exhibitionId,
  itemId,
  placement
) => {
  const response = await api.patch(
    `/api/exhibitions/${exhibitionId}/items/${itemId}/position`,
    { placement }
  );

  return response.data;
};