import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from '../context/AuthProvider';

// eslint-disable-next-line react/prop-types
const PrivateRouter = ({ children }) => {
  const { currentUser, loading, logout , setCurrentUser } = useContext(AuthContext);
  const location = useLocation();

  const token = localStorage.getItem("access-token");

  let isTokenValid = true;

  const getTokenExpiry = () => {
    const token = localStorage.getItem("access-token");
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000; // Convert to ms
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const expiry = getTokenExpiry();
    if (!expiry) return;
  
    const now = Date.now();
    const timeLeft = expiry - now;
  
    if (timeLeft > 0) {
      const timeout = setTimeout(() => {
        console.log("JWT expired, logging out");
        logout();
        localStorage.removeItem("access-token");
        setCurrentUser(null);
      }, timeLeft);
  
      return () => clearTimeout(timeout);
    }
  }, [currentUser]);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={40} color="#2c3e50" loading={true} />
      </div>
    );
  }

  if ( !token || !isTokenValid) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouter;