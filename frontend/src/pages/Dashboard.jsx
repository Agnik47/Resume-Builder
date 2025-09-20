import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidenavbar from '../components/Dashboard/Sidenavbar';

const Dashboard = () => {
  // Read the analysis status from the Redux store
  const { status } = useSelector((state) => state.resume);
  const isAnalyzed = status === 'succeeded';

  return (
    <div className='flex w-full min-h-screen bg-gray-50'>
      <Sidenavbar show={isAnalyzed} />

      {/* The Outlet will render the current page (e.g., ResumeAnalyzer) */}
      <main className='flex-1 p-6 md:p-8  overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;