// 📄 src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

// ✅ Reusable instance
const axiosSecureInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useMemo(() => {
    const requestInterceptor = axiosSecureInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecureInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
          navigate('/signup');
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecureInstance.interceptors.request.eject(requestInterceptor);
      axiosSecureInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate]);

  return axiosSecureInstance;
};

export { axiosSecureInstance }; // 🧠 Named export for Redux or utils
export default useAxiosSecure; // 👀 Default export for components
