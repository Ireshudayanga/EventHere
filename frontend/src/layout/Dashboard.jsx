import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { ToastContainer } from 'react-toastify'; // ✅
import 'react-toastify/dist/ReactToastify.css'; // ✅

const Dashboard = () => {
  return (
    <div>
      <Outlet />
      <SideBar />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
