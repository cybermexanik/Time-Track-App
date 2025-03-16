import MainLayout from '../layout/MainLayout';
import React from 'react';
import ErrorPage from '../pages/error-page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/settings/SettingPage';
import WebsitesPage from '../pages/websites/WebsitePage';
import ReportsPage from '../pages/reports/ReportPage';
import MetricsPage from '../pages/performance-metrics/MetricsPage';
import Register from '../pages/auth/Register';
import Auth from '../pages/auth/Auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: 'profile', element: <ProfilePage /> }, 
      { path: 'settings', element: <SettingsPage /> },
      { path: 'employees', element: <WebsitesPage /> },
      { path: 'worktime', element: <MetricsPage /> },
      { path: 'applications', element: <HomePage /> },
      { path: 'screenshots', element: <HomePage /> },
      { path: 'reports', element: <ReportsPage /> },
    ],
  },
  {
    path:'/auth',
    element: <Auth/>,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
