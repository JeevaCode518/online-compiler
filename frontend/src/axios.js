import axios from "axios";

// Create a custom Axios instance
const api = axios.create({
  baseURL: "https://codeverse-v5df.onrender.com", // Your backend base URL
  withCredentials: true, // Needed for cookies
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/"; // Redirect if unauthorized
    }
    return Promise.reject(error);
  }
);

export default api;
