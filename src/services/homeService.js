import api from "./api";

async function getForYou(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/home/foryou", config);
  return response.data;
}

async function getSeason(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/home/season", config);
  return response.data;
}

async function getPopular(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/home/popular", config);
  return response.data;
}

const homeService = {
  getForYou,
  getSeason,
  getPopular,
};

export default homeService;
