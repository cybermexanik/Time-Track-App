// src/router/router.tsx
import MainLayout from '../layout/MainLayout';
import * as React from "react";
import ErrorPage from '../pages/error-page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/settings/SettingsPage';
import WebsitesPage from '../pages/websites/WebsitePage';
import ReportsPage from '../pages/reports/ReportPage';
import MetricsPage from '../pages/activity/ActivityPage';
import Register from '../pages/auth/Register';
import Auth from '../pages/auth/Auth';
import EmployyesPage from "../pages/employyes/EmployyesPage";
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: 'settings',
        element: (
            <SettingsPage />
        ),
      },
      {
        path: 'employees',
        element: (
            <EmployyesPage />
        ),
      },
      {
        path: 'reports',
        element: (
            <ReportsPage />
        ),
      },

      {
        path: 'worktime',
        element: (
            <MetricsPage />
        ),
      },
      {
        path: 'applications',
        element: (
            <HomePage />
        ),
      },
      {
        path: 'screenshots',
        element: (
            <HomePage />
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/unauthorized',
    element: <div>⛔ Нет доступа</div>,
  },
]);
