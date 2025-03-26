import {RouterProvider} from 'react-router-dom'
import './App.css'
import router from './router/Router'
import "../src/firebase/firebase.config"; 


function App() {

  
  return (
      <RouterProvider router={router} />
  )
}

export default App
