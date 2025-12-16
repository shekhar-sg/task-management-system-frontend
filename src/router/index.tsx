import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute.tsx';
import Layout from '@/Layout.tsx';
import Login from '@/pages/Login.tsx';
import TasksPage from '@/pages/task/tasks.page.tsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <TasksPage /> }],
  },
]);
