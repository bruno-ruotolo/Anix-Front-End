import api from "./api";

async function getProfileInfos(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/user`, config);
  return response.data;
}

const profileService = { getProfileInfos };
export default profileService;
