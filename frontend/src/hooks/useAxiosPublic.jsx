// 📄 src/hooks/useAxiosPublic.js
import axios from 'axios';

// ✅ Axios instance (for Redux, or anywhere)
const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ Hook (for React components)
const useAxiosPublic = () => {
  return axiosPublic;
};

// ✅ Export both
export { axiosPublic };
export default useAxiosPublic;
