// 📦 axiosSecure.js
import axios from 'axios';
import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

// 🔁 create only once outside the hook
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
        // console.log('🛂 Attaching token:', token); // <--- This should now log ✅
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
  }, [logout, navigate]); // ✅ Run only once per mount

  return axiosSecureInstance;
};

export default useAxiosSecure;
