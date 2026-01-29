import axios from "axios";
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://digital-ebook-studio-api-v132.onrender.com/api",
});

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export default API;
