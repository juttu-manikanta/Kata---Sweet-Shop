import api from "./api";

export async function login(data) {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
}

export async function registerUser(data) {
  return (await api.post("/auth/register", data)).data;
}

export async function getProfile() {
  return (await api.get("/auth/profile")).data;
}
