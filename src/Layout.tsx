import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { registerTaskSocketEvents } from '@/modules/tasks';

const Layout = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    registerTaskSocketEvents(queryClient);
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className={'p-4 border-b-4'}>navbar</header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
