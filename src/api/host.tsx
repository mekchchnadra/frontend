import axios from "axios";

const PROD = false;
const BASE_URL = PROD ? "" : "http://localhost:8080/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Increased timeout to 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken != null) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn("Logged out user due to session expiry");
    } else {
      console.error("Request failed:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
