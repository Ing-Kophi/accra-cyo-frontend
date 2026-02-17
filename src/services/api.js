import axios from "axios";

const rawBaseUrl = process.env.REACT_APP_API_URL || "";
const baseURL = rawBaseUrl.replace(/\/+$/, ""); // remove trailing slash

const api = axios.create({
  baseURL,
  withCredentials: false
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cyo_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
