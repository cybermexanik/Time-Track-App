import Sidebar from './Sidebar/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ContentTop from '../components/ContentTop/ContentTop';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <ContentTop />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
