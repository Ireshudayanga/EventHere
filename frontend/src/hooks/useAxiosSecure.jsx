import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAxiosPublic from './useAxiosPublic';

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic(); // ✅ Call the hook here

  const axiosSecure = axios.create({
    baseURL: axiosPublic.defaults.baseURL, // ✅ Now this works
  });

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
          navigate('/signup');
        }
        return Promise.reject(error);
      }
    );

    // 🧼 Clean up interceptors when unmounted
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
