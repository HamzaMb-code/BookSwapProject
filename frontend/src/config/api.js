import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401: // Unauthorized
          // Redirect to login or handle token expiration
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403: // Forbidden
          alert("You do not have permission to perform this action");
          break;
        case 404: // Not Found
          console.error("Resource not found");
          break;
        default:
          console.error("An error occurred:", error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
