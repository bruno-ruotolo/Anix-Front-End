import api from "./api";

async function createUser(data) {
  const response = await api.post("/signup", data);
  return response.data;
}

async function getAllGenres() {
  const response = await api.get("/genres");
  return response.data;
}

async function getAllGenders() {
  const response = await api.get("/genders");
  return response.data;
}

async function validateEmail(data) {
  const response = await api.post("/emailValidate", data);
  return response.data;
}

async function createTokenAndLogin(data) {
  const response = await api.post("/", data);
  return response.data;
}

const signUpService = {
  getAllGenres,
  getAllGenders,
  validateEmail,
  createUser,
  createTokenAndLogin,
};

export default signUpService;
