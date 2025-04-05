import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
            Sistem Manajemen Spare Part Mobil Listrik
          </h1>
          <p className="mt-3 text-lg text-center text-gray-600 dark:text-gray-400">
            Solusi manajemen produk dan inventori yang efektif untuk spare part kendaraan listrik
          </p>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl w-full space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Image
                src="/electric-car.svg"
                alt="Electric Car Illustration"
                width={500}
                height={400}
                className="w-full"
                priority
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Kelola Spare Part Dengan Mudah
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Platform ini menyediakan solusi lengkap untuk melacak, mengelola, dan mengoptimalkan inventori spare part mobil listrik.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <Link
                  href="/frontend"
                  className="py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Sistem Manajemen
                </Link>
                <Link
                  href="/api-docs"
                  className="py-4 px-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-center transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Dokumentasi API
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Fitur Utama</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">Manajemen Produk</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Kelola spare part dengan mudah termasuk harga dan detail.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">Pelacakan Inventori</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Pantau dan lacak status stok secara real-time.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">API Terintegrasi</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  API lengkap untuk integrasi dengan sistem lain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Sistem Manajemen Spare Part Mobil Listrik. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
