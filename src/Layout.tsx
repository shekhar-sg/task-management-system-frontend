import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {registerTaskSocketEvents} from '@/modules/tasks';
import Navbar from '@/components/Navbar.tsx';

const Layout = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    registerTaskSocketEvents(queryClient);
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
