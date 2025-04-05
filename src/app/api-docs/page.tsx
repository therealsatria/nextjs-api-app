import React from 'react';
import { FC } from "react";
import Link from "next/link";

// Komponen untuk menampilkan API dari halaman sebelumnya
// Dengan sedikit modifikasi pada header untuk konsistensi UI
// Seluruh konten utama tetap sama seperti sebelumnya

// Route untuk mengelompokkan endpoint-endpoint
interface Route {
  name: string;
  description: string;
  endpoints: Endpoint[];
}

// Interface endpoint API
interface Endpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  requestBody?: {
    example: string;
    fields: { name: string; type: string; description: string; required: boolean }[];
  };
  responseExample?: string;
}

// Data dokumentasi API
const apiRoutes: Route[] = [
  {
    name: "Products",
    description: "Endpoint untuk manajemen produk spare part mobil listrik",
    endpoints: [
      {
        method: "GET",
        path: "/api/products",
        description: "Mendapatkan daftar semua produk",
        responseExample: `{
  "success": true,
  "data": [
    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "name": "Battery Pack 75kWh",
      "description": "Baterai lithium-ion 75kWh untuk mobil listrik premium",
      "price": 8500000,
      "createdAt": "2023-05-15T08:30:00.000Z",
      "inventory": {
        "id": "b5f8c3e1-3b7c-4b42-a335-7f924e6a9214",
        "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "quantity": 12,
        "updatedAt": "2023-05-15T08:30:00.000Z"
      }
    }
  ]
}`
      },
      {
        method: "POST",
        path: "/api/products",
        description: "Membuat produk baru",
        requestBody: {
          example: `{
  "name": "Electric Motor AC",
  "description": "Motor AC 150kW untuk penggerak utama",
  "price": 6750000,
  "initialQuantity": 8
}`,
          fields: [
            { name: "name", type: "string", description: "Nama produk", required: true },
            { name: "description", type: "string", description: "Deskripsi produk", required: false },
            { name: "price", type: "number", description: "Harga produk dalam Rupiah", required: true },
            { name: "initialQuantity", type: "number", description: "Jumlah stok awal", required: true }
          ]
        },
        responseExample: `{
  "success": true,
  "data": {
    "id": "d2773336-f723-11e9-8f0b-362b9e155667",
    "name": "Electric Motor AC",
    "description": "Motor AC 150kW untuk penggerak utama",
    "price": 6750000,
    "createdAt": "2023-09-18T07:45:00.000Z",
    "inventory": {
      "id": "d2773c58-f723-11e9-8f0b-362b9e155667",
      "productId": "d2773336-f723-11e9-8f0b-362b9e155667",
      "quantity": 8,
      "updatedAt": "2023-09-18T07:45:00.000Z"
    }
  },
  "message": "Resource created successfully"
}`
      },
      {
        method: "GET",
        path: "/api/products/:id",
        description: "Mendapatkan detail produk berdasarkan ID",
        responseExample: `{
  "success": true,
  "data": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "name": "Battery Pack 75kWh",
    "description": "Baterai lithium-ion 75kWh untuk mobil listrik premium",
    "price": 8500000,
    "createdAt": "2023-05-15T08:30:00.000Z",
    "inventory": {
      "id": "b5f8c3e1-3b7c-4b42-a335-7f924e6a9214",
      "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "quantity": 12,
      "updatedAt": "2023-05-15T08:30:00.000Z"
    }
  }
}`
      },
      {
        method: "PUT",
        path: "/api/products/:id",
        description: "Memperbarui produk berdasarkan ID",
        requestBody: {
          example: `{
  "name": "Battery Pack 75kWh - Premium Edition",
  "description": "Baterai lithium-ion 75kWh untuk mobil listrik premium dengan garansi 36 bulan",
  "price": 8750000
}`,
          fields: [
            { name: "name", type: "string", description: "Nama produk baru", required: false },
            { name: "description", type: "string", description: "Deskripsi produk baru", required: false },
            { name: "price", type: "number", description: "Harga produk baru dalam Rupiah", required: false }
          ]
        },
        responseExample: `{
  "success": true,
  "data": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "name": "Battery Pack 75kWh - Premium Edition",
    "description": "Baterai lithium-ion 75kWh untuk mobil listrik premium dengan garansi 36 bulan",
    "price": 8750000,
    "createdAt": "2023-05-15T08:30:00.000Z",
    "inventory": {
      "id": "b5f8c3e1-3b7c-4b42-a335-7f924e6a9214",
      "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "quantity": 12,
      "updatedAt": "2023-05-15T08:30:00.000Z"
    }
  },
  "message": "Product updated successfully"
}`
      },
      {
        method: "PATCH",
        path: "/api/products/:id",
        description: "Memperbarui inventori produk berdasarkan ID",
        requestBody: {
          example: `{
  "quantity": 15
}`,
          fields: [
            { name: "quantity", type: "number", description: "Jumlah stok baru", required: true }
          ]
        },
        responseExample: `{
  "success": true,
  "data": {
    "id": "b5f8c3e1-3b7c-4b42-a335-7f924e6a9214",
    "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "quantity": 15,
    "updatedAt": "2023-09-18T14:22:00.000Z"
  },
  "message": "Inventory updated successfully"
}`
      },
      {
        method: "DELETE",
        path: "/api/products/:id",
        description: "Menghapus produk beserta inventory-nya berdasarkan ID",
        responseExample: `Status: 204 No Content

(Tidak ada body response)`
      },
      {
        method: "POST",
        path: "/api/products/bulk",
        description: "Membuat beberapa produk sekaligus",
        requestBody: {
          example: `{
  "products": [
    {
      "name": "Controller Unit",
      "description": "Unit pengontrol sistem elektronik mobil listrik",
      "price": 3250000,
      "initialQuantity": 15
    },
    {
      "name": "Power Inverter",
      "description": "Pengubah arus DC ke AC untuk motor",
      "price": 2800000,
      "initialQuantity": 20
    }
  ]
}`,
          fields: [
            { name: "products", type: "array", description: "Array dari objek produk", required: true }
          ]
        },
        responseExample: `{
  "success": true,
  "data": [
    {
      "id": "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
      "name": "Controller Unit",
      "description": "Unit pengontrol sistem elektronik mobil listrik",
      "price": 3250000,
      "createdAt": "2023-09-18T14:30:00.000Z",
      "inventory": {
        "id": "78449a7d-b1c2-48a3-851d-87a23f7e9d88",
        "productId": "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
        "quantity": 15,
        "updatedAt": "2023-09-18T14:30:00.000Z"
      }
    },
    {
      "id": "4d8c178e-f33d-4d1b-a726-64ee1f1c1b82",
      "name": "Power Inverter",
      "description": "Pengubah arus DC ke AC untuk motor",
      "price": 2800000,
      "createdAt": "2023-09-18T14:30:00.000Z",
      "inventory": {
        "id": "ef25d8f5-9c7b-4c92-8da3-ad2e9a95d762",
        "productId": "4d8c178e-f33d-4d1b-a726-64ee1f1c1b82",
        "quantity": 20,
        "updatedAt": "2023-09-18T14:30:00.000Z"
      }
    }
  ],
  "message": "Products created successfully"
}`
      },
      {
        method: "DELETE",
        path: "/api/products/bulk",
        description: "Menghapus beberapa produk sekaligus berdasarkan ID",
        requestBody: {
          example: `{
  "ids": ["6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b", "4d8c178e-f33d-4d1b-a726-64ee1f1c1b82"]
}`,
          fields: [
            { name: "ids", type: "array", description: "Array dari ID produk yang akan dihapus", required: true }
          ]
        },
        responseExample: `Status: 204 No Content

(Tidak ada body response)`
      }
    ]
  },
  {
    name: "Inventory",
    description: "Endpoint untuk manajemen stok produk",
    endpoints: [
      {
        method: "GET",
        path: "/api/inventory",
        description: "Mendapatkan daftar semua stok inventori",
        responseExample: `{
  "success": true,
  "data": [
    {
      "id": "b5f8c3e1-3b7c-4b42-a335-7f924e6a9214",
      "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "quantity": 12,
      "updatedAt": "2023-05-15T08:30:00.000Z"
    }
  ]
}`
      },
      {
        method: "POST",
        path: "/api/inventory",
        description: "Membuat stok inventori baru untuk produk",
        requestBody: {
          example: `{
  "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "quantity": 25
}`,
          fields: [
            { name: "productId", type: "string", description: "ID produk", required: true },
            { name: "quantity", type: "number", description: "Jumlah stok", required: true }
          ]
        },
        responseExample: `{
  "success": true,
  "data": {
    "id": "c9a4aaa7-cd94-478a-9209-7f89742c5f1d",
    "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "quantity": 25,
    "updatedAt": "2023-09-18T15:00:00.000Z"
  },
  "message": "Resource created successfully"
}`
      },
      {
        method: "GET",
        path: "/api/inventory/:id",
        description: "Mendapatkan detail inventori berdasarkan ID",
        responseExample: `{
  "success": true,
  "data": {
    "id": "b5f8c3e1-3b7c-4b42-a335-7f924e6a9214",
    "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "quantity": 12,
    "updatedAt": "2023-05-15T08:30:00.000Z"
  }
}`
      },
      {
        method: "PUT",
        path: "/api/inventory/:id",
        description: "Memperbarui stok inventori berdasarkan ID",
        requestBody: {
          example: `{
  "quantity": 30
}`,
          fields: [
            { name: "quantity", type: "number", description: "Jumlah stok baru", required: true }
          ]
        },
        responseExample: `{
  "success": true,
  "data": {
    "id": "b5f8c3e1-3b7c-4b42-a335-7f924e6a9214",
    "productId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "quantity": 30,
    "updatedAt": "2023-09-18T15:05:00.000Z"
  },
  "message": "Inventory updated successfully"
}`
      },
      {
        method: "DELETE",
        path: "/api/inventory/:id",
        description: "Menghapus inventori berdasarkan ID",
        responseExample: `Status: 204 No Content

(Tidak ada body response)`
      }
    ]
  },
  {
    name: "Database Test",
    description: "Endpoint untuk memeriksa koneksi database",
    endpoints: [
      {
        method: "GET",
        path: "/api/db-test",
        description: "Memeriksa dan menampilkan status koneksi database",
        responseExample: `{
  "success": true,
  "data": {
    "status": "Connected",
    "host": "localhost",
    "user": "postgres",
    "database": "product_db",
    "port": "5432",
    "currentTime": "2023-09-18T15:15:00.000Z",
    "responseTimeMs": 12.45
  },
  "message": "Database connection test successful"
}`
      }
    ]
  }
];

// Komponen untuk menampilkan contoh kode JSON
const CodeBlock: FC<{ code: string }> = ({ code }) => (
  <pre className="rounded bg-gray-100 dark:bg-gray-800 p-4 overflow-x-auto text-xs sm:text-sm">
    <code>{code}</code>
  </pre>
);

// Badge untuk metode HTTP
const MethodBadge: FC<{ method: string }> = ({ method }) => {
  const colors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    POST: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };

  return (
    <span className={`inline-block px-2 py-1 rounded font-mono text-xs font-semibold ${colors[method]}`}>
      {method}
    </span>
  );
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">API Manajemen Spare Part Mobil Listrik</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Dokumentasi lengkap untuk API manajemen produk dan inventori spare part mobil listrik
            </p>
          </div>
          <Link 
            href="/" 
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Penggunaan API</h2>
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p>
                API ini menyediakan endpoint untuk mengelola produk spare part mobil listrik dan stok inventorinya.
                Semua endpoint mengembalikan respons dalam format JSON dengan struktur yang konsisten.
              </p>
              <h3>Format Respons</h3>
              <p>Semua respons API mengikuti format berikut:</p>
              <ul>
                <li>
                  <strong>Sukses:</strong>{" "}
                  <code>{`{ "success": true, "data": {...}, "message": "..." }`}</code>
                </li>
                <li>
                  <strong>Error:</strong>{" "}
                  <code>{`{ "success": false, "error": "...", "details": {...} }`}</code>
                </li>
              </ul>
              <h3>Autentikasi</h3>
              <p>
                API ini menggunakan autentikasi sederhana. Pengguna dapat melakukan semua operasi CRUD tanpa autentikasi
                untuk tujuan pengembangan dan pengujian.
              </p>
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-6">
              <h3>Menjalankan API</h3>
              <ol>
                <li>
                  Mulai database PostgreSQL: <code>./start-db.sh</code>
                </li>
                <li>
                  Jalankan server development: <code>npm run dev</code>
                </li>
                <li>
                  API akan tersedia di <code>http://localhost:3000/api</code>
                </li>
                <li>
                  Untuk menghentikan database: <code>./stop-db.sh</code>
                </li>
              </ol>
              <h3>Generate Data Dummy</h3>
              <p>
                Jalankan script berikut untuk membuat data dummy spare part mobil listrik:
              </p>
              <pre><code>./generate_and_test_api.sh</code></pre>
            </div>
          </section>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* Navigasi Endpoint */}
          <section id="endpoints">
            <h2 className="text-2xl font-bold mb-4">Daftar Endpoint</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {apiRoutes.map((route) => (
                <Link 
                  key={route.name}
                  href={`#${route.name.toLowerCase()}`}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-lg font-medium">{route.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{route.description}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    {route.endpoints.length} endpoint
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Routes & Endpoints */}
          {apiRoutes.map((route) => (
            <section 
              key={route.name} 
              id={route.name.toLowerCase()} 
              className="pt-8 pb-4 border-t border-gray-200 dark:border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-2">{route.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{route.description}</p>

              <div className="space-y-8">
                {route.endpoints.map((endpoint, index) => (
                  <div key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <MethodBadge method={endpoint.method} />
                      <span className="font-mono text-sm font-semibold">{endpoint.path}</span>
                    </div>
                    <p className="mb-4">{endpoint.description}</p>

                    {endpoint.requestBody && (
                      <div className="mb-4">
                        <h4 className="text-lg font-medium mb-2">Request Body</h4>
                        <CodeBlock code={endpoint.requestBody.example} />
                        <h5 className="font-medium mt-3 mb-2">Fields:</h5>
                        <div className="overflow-x-auto rounded border dark:border-gray-700">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Field</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Required</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                              {endpoint.requestBody.fields.map((field, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                  <td className="px-4 py-2 font-mono text-xs">{field.name}</td>
                                  <td className="px-4 py-2 font-mono text-xs">{field.type}</td>
                                  <td className="px-4 py-2">
                                    {field.required ? (
                                      <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-200">
                                        Ya
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center rounded-full bg-gray-50 dark:bg-gray-700 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                                        Tidak
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2">{field.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {endpoint.responseExample && (
                      <div>
                        <h4 className="text-lg font-medium mb-2">Response Example</h4>
                        <CodeBlock code={endpoint.responseExample} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>API Dokumentasi Spare Part Mobil Listrik</p>
        <p className="mt-1">© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
} 