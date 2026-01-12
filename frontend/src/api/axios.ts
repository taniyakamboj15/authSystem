import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Global error logging or handling
        if (error.response) {
            console.error('API Error:', error.response.data);
            if (error.response.status === 401) {
                // Could dispatch a logout action here or redirect
                // window.location.href = '/login'; 
            }
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
