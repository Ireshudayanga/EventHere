/* eslint-disable react/prop-types */

import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const PrivateRouter = ({children}) => {

    const { currentUser, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return  <ClipLoader size={40} color={"#3498db"} loading={true} />
    }
    if(currentUser){
        return children
    }
    return (
       < Navigate to="/signup" state={{from: location}} />
    )

}

export default PrivateRouter
