/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const PrivateRouter = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={40} color="#2c3e50" loading={true} />
      </div>
    );
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/signup" state={{ from: location }} />;
};

export default PrivateRouter;
