import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-tr from-[#181c2f] via-[#232946] to-[#1a1a2e] flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-6 bg-[hsl(var(--card))]/90 backdrop-blur-md rounded-t-3xl shadow-lg mt-2">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 