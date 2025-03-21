import axios from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAxiosPublic from './useAxiosPublic';

const axiosPublic = useAxiosPublic

const axiosSecure = axios.create({
  baseURL: axiosPublic.defaults.baseURL,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);

    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                logout();
                navigate('/signup');
            }
            return Promise.reject(error);
        }
    );
}

export default useAxiosSecure;