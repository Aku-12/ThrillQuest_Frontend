import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// ✅ Ensure this is the updated router that includes Admin routes
import AppRouter from './routers/AppRouter.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import toastify styles

import AuthContextProvider from './auth/AuthProvider.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          theme="dark"
          transition={Slide}
        />
      </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>
);
