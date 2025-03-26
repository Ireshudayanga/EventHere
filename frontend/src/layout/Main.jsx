import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify'; // ✅
import 'react-toastify/dist/ReactToastify.css'; // ✅

const Main = () => {
  return (
    <div className='bg-image'>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Main;
