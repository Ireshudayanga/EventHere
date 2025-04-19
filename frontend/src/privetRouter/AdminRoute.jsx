/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
// adjust path based on your structure

const AdminRoute = ({ children }) => {

    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    }

    if (currentUser?.role === 'admin') {
        return children;
    }
   
    return <Navigate to="/events" replace />;
};

export default AdminRoute;
