import api from "./api";

async function creatSignUpCredentials(data) {
  const response = await api.post("/recomendations", data);
  return response.data;
}

const signUpService = {};

export default signUpService;
