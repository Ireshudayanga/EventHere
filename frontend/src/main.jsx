import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../src/pages/Home/Home.css';
import AuthProvider from './context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>,
)
