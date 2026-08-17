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

export const addExhibitionItem = async (
  exhibitionId,
  itemData
) => {
  const response = await api.post(
    `/api/exhibitions/${exhibitionId}/items`,
    itemData
  );

  return response.data;
};

export const uploadExhibitionItem = async (
  exhibitionId,
  file,
  data
) => {
  const formData = new FormData();

  formData.append("image", file);

  formData.append(
    "data",
    new Blob(
      [JSON.stringify(data)],
      { type: "application/json" }
    )
  );

  const response = await api.post(
    `/api/exhibitions/${exhibitionId}/items/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getExhibitionItems = async (
  exhibitionId,
  cursor,
  size = 20
) => {
  const params = { size };

  if (cursor) {
    params.cursor = cursor;
  }

  const response = await api.get(
    `/api/exhibitions/${exhibitionId}/items`,
    { params }
  );

  return response.data;
};

export const getExhibitionItem = async (
  exhibitionId,
  itemId
) => {
  const response = await api.get(
    `/api/exhibitions/${exhibitionId}/items/${itemId}`
  );

  return response.data;
};