import axios from "axios";

// Create a custom Axios instance
const api = axios.create({
  baseURL: "http://localhost:5173", // Your backend base URL
  withCredentials: true, // Needed for cookies
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login"; // Redirect if unauthorized
    }
    return Promise.reject(error);
  }
);

export default api;
