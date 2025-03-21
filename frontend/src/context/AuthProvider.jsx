/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import { auth, createUser, signInWithGoogle, login, logout, updateUserProfile } from "../firebase/authService"; // Import functions
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const  axiosPublic = useAxiosPublic();
  
  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setCurrentUser(user);
        user.getIdToken()
        .then((idToken) => {
          return axiosPublic.post("/jwt", {token: idToken });
        })
        .then((response) => {
          localStorage.setItem("access-token",response.data.token);
        })
        .catch((error) => {
          console.error("Error fetching or sending token:", error);
        });
      } else{
        setCurrentUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const authInfo = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    createUser,
    signInWithGoogle,
    login,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
