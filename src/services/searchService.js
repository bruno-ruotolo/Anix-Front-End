import api from "./api";

async function getSearchAnimes(token, query) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/search${query}`, config);
  return response.data;
}

async function getAllYears(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/years`, config);
  return response.data;
}

async function getAllGenres(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/genres`, config);
  return response.data;
}

const searchService = { getSearchAnimes, getAllYears, getAllGenres };
export default searchService;
