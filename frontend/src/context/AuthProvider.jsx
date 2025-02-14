/* eslint-disable react/prop-types */
import React, { createContext } from 'react'
import app from "../firebase/firebase.config"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


// Initialize Firebase Authentication 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Create User Account
  const  createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Sign In with Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
  }

  // Login Using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Logout
  const logout = () => {
    return signOut(auth)
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const authInfo = {  currentUser, setCurrentUser, loading, setLoading, createUser, signInWithGoogle, login, logout }

  return (
    <AuthContext.Provider value={ authInfo} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

