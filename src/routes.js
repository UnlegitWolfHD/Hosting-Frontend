import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './modules/layouts/dashboard';
import AdminDashboardLayout from './modules/layouts/adminDashboard';

import LogoOnlyLayout from './modules/layouts/LogoOnlyLayout';
//

import NotFound from './modules/pages/Page404';
import DashboardApp from './modules/pages/DashboardApp';
import Profil from './modules/pages/Profil';

import Login from './modules/pages/Login';
import Register from './modules/pages/Register';

import User from './modules/pages/Admin/User';
import Announce from './modules/pages/Admin/Announce';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'profil', element: <Profil /> }
      ],
    },
    {
      path: '/admin',
      element: <AdminDashboardLayout />,
      children: [
        { path: 'user', element: <User /> },
        { path: 'announce', element: <Announce /> }
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
