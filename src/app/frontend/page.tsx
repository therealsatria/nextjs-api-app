import React from 'react';

// Komponen client-side
const FrontendApp = () => {
  // Dynamically import frontend App for client-side rendering
  const FrontendApp = React.lazy(() => import('../../frontend/pages/_app'));

  // Fallback saat sedang loading komponen
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <FrontendApp />
      </React.Suspense>
    </div>
  );
};

// Halaman Next.js yang menggunakan client-side rendering
export default function FrontendPage() {
  return (
    <div>
      {/* Render client-side component */}
      <FrontendApp />
    </div>
  );
} 