// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your API base URL
  timeout: 10000, // Optional: request timeout in milliseconds
  withCredentials:true,
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // Return the response if successful
    },
    (error) => {
        const { response } = error;

        const statusCode = response?.status;
        const messageErrors = response?.data?.error;
        
        // Check if the error status is 401 (Unauthorized)
        if (statusCode === 401 && ['Invalid jwt token', 'Unauthorized access'].includes(messageErrors)) {
            localStorage.clear();
            window.location.href = '/';

            // Redirect to login page (this would need to be implemented)
            // Since interceptors can't perform redirects directly,
            throw new Error('Token expired'); // You can catch this specific error later
        }

        return Promise.reject(error); // Reject any other errors
    }
);

export default axiosInstance;

