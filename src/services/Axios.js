// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your API base URL
  timeout: 10000, // Optional: request timeout in milliseconds
  withCredentials:true,
});

// Response interceptor to handle token expiration
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response; // Return the response if successful
//     },
//     (error) => {
//         return Promise.reject(error); // Reject any other errors
//     }
// );

export default axiosInstance;

