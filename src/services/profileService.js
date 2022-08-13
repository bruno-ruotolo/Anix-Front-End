import api from "./api";

async function getProfileInfos(token, userId) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/user/${userId}`, config);
  return response.data;
}

const profileService = { getProfileInfos };
export default profileService;
