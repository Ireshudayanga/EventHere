/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import { auth, createUser, signInWithGoogle, login, logout, updateUserProfile } from "../firebase/authService"; // Import functions

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
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
