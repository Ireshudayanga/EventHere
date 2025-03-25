/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import { auth, createUser, signInWithGoogle, login, logout, updateUserProfile } from "../firebase/authService"; // Import functions
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const  axiosPublic = useAxiosPublic();
  
  // Listen for authentication state changes
  useEffect(() => {
    // Set Firebase to session-only persistence (clears on tab/browser close)
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const idToken = await user.getIdToken();
            try {
              const response = await axiosPublic.post("/jwt", { token: idToken });
              const appToken = response.data.token;
              localStorage.setItem("access-token", appToken);
              setCurrentUser(user);
            } catch (error) {
              console.error("Token error:", error);
              await logout();
              localStorage.removeItem("access-token");
              setCurrentUser(null);
            }
          } else {
            setCurrentUser(null);
            localStorage.removeItem("access-token");
          }
          setLoading(false);
        });
  
        return unsubscribe;
      })
      .catch((error) => {
        console.error("Error setting Firebase persistence:", error);
      });
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
