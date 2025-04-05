'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductsPage from './ProductsPage';
import '../styles/globals.css';

// Inisialisasi React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sistem Manajemen Spare Part Mobil Listrik
            </h1>
          </div>
        </header>
        <main>
          <ProductsPage />
        </main>
        <footer className="bg-white dark:bg-gray-800 shadow mt-10">
          <div className="container mx-auto px-4 py-4 text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Manajemen Spare Part Mobil Listrik | Semua hak dilindungi
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default App; 