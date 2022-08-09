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

const homeService = {
  getForYou,
};

export default homeService;
