import api from "./api";

async function getUserStatusAnime(token, query) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/user/animes${query}`, config);
  return response.data;
}

const userStatusAnime = { getUserStatusAnime };
export default userStatusAnime;
