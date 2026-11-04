export const registerUserApi = async (api , data) => {
  const res = await api.post("/api/auth/register", data);
  return res;
};

export const loginUserApi = async (api , data) => {
  const res = await api.post("/api/auth/login", data);
  return res;
}

export const logoutUserApi = async (api) => {
  const res = await api.post("/api/auth/logout");
  return res;
}
