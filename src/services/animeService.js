import api from "./api";

async function getAnimeInfos(token, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/anime/${id}`, config);
  return response.data;
}

async function createRate(token, id, rate) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(`/anime/${id}/rate`, { rate }, config);
  return response.data;
}

async function createFavorite(token, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(`/anime/${id}/favorite`, null, config);
  return response.data;
}

async function deleteFavorite(token, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`/anime/${id}/favorite`, config);
  return response.data;
}

async function createStatus(token, animeId, statusId) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(
    `/anime/${animeId}/status`,
    { statusId },
    config
  );
  return response.data;
}

async function deleteStatus(token, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`/anime/${id}/status`, config);
  return response.data;
}

async function getAllStatus(token, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/anime/${id}/status`, config);
  return response.data;
}

const animeService = {
  getAnimeInfos,
  createRate,
  createFavorite,
  deleteFavorite,
  createStatus,
  deleteStatus,
  getAllStatus,
};

export default animeService;
