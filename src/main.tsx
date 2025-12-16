import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { useAuthInit } from '@/modules/auth';
import { router } from './router';
import './index.css';
import '@/stores/theme.store';

const queryClient = new QueryClient();

const App = () => {
  useAuthInit();
  return <RouterProvider router={router} />;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
}
