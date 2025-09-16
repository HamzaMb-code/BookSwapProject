import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
axiosClient.interceptors.response.use(
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
