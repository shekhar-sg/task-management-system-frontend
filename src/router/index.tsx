import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/Layout';
import Login from '@/pages/Login';
import DashboardLayout from '@/pages/task/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      // <ProtectedRoute>
      <Layout />
      // </ProtectedRoute>
    ),
    children: [{ index: true, element: <DashboardLayout /> }],
  },
]);
