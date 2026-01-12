import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        
        if (error.response) {
            console.error('API Error:', error.response.data);
            if (error.response.status === 401) {
              
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
