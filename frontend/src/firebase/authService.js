import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider } from "firebase/auth";
import app from "./firebase.config";

// Initialize Firebase Authentication 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Create User Account
export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign In with Google
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Update User Profile
export const updateUserProfile = (name) => {
  return updateProfile(auth.currentUser, { displayName: name });
};

// Login Using Email and Password
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = () => {
  return signOut(auth);
};

// Export Firebase Auth Instance
export { auth };
