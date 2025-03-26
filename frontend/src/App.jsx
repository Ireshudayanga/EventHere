import {RouterProvider} from 'react-router-dom'
import './App.css'
import router from './router/Router'
import "../src/firebase/firebase.config"; 

import { useContext } from 'react';
import { AuthContext } from './context/AuthProvider';


function App() {

  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser?.email || null;
  
  return (
      <RouterProvider router={router} />
  )
}

export default App
