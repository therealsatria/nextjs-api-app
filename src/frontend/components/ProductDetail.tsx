import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onEdit: (product: Product) => void;
  onUpdateInventory: (product: Product) => void;
  onDelete: (productId: string) => void;
  isDeleteLoading: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onEdit,
  onUpdateInventory,
  onDelete,
  isDeleteLoading
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Detail Produk
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <span className="sr-only">Tutup</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              {product.name}
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {product.description || "Tidak ada deskripsi"}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  ID Produk
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {product.id}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tanggal Dibuat
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date(product.createdAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Harga
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  Rp {product.price.toLocaleString('id-ID')}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Stok
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                  <span className={`mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${product.inventory && product.inventory.quantity > 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}
                  >
                    {product.inventory ? product.inventory.quantity : 0}
                  </span>
                  {product.inventory 
                    ? `Terakhir diperbarui: ${new Date(product.inventory.updatedAt).toLocaleDateString('id-ID')}`
                    : 'Belum ada data inventori'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => onDelete(product.id)}
          disabled={isDeleteLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleteLoading ? 'Menghapus...' : 'Hapus Produk'}
        </button>
        <button
          type="button"
          onClick={() => onUpdateInventory(product)}
          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Perbarui Stok
        </button>
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit Produk
        </button>
      </div>
    </div>
  );
};

export default ProductDetail; 