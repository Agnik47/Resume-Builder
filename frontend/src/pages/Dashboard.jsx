import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Sidenavbar from '../components/Dashboard/Sidenavbar';

const Dashboard = () => {
  return (
    <div className='flex w-full h-screen bg-gray-50'>
      <Sidenavbar />

      {/* The Outlet component renders the active child route */}
      <main className='flex-1 p-6 md:p-10 overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;