'use client';

import React from 'react';
import { FilterOptions } from '../types';

interface ProductFilterProps {
  filterOptions: FilterOptions;
  onFilterChange: (options: Partial<FilterOptions>) => void;
  onResetFilter: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filterOptions,
  onFilterChange,
  onResetFilter
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handlePriceChange = (
    type: 'minPrice' | 'maxPrice',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    onFilterChange({ [type]: value });
  };

  const handleQuantityChange = (
    type: 'minQuantity' | 'maxQuantity',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    onFilterChange({ [type]: value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortOrder: e.target.value as FilterOptions['sortOrder'] });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Filter Produk</h3>
        <button
          type="button"
          onClick={onResetFilter}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Reset Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pencarian */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cari
          </label>
          <input
            type="text"
            id="search"
            value={filterOptions.search}
            onChange={handleSearchChange}
            placeholder="Cari nama atau deskripsi..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        {/* Range Harga */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rentang Harga
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={filterOptions.minPrice || ''}
              onChange={(e) => handlePriceChange('minPrice', e)}
              placeholder="Min"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            <input
              type="number"
              value={filterOptions.maxPrice || ''}
              onChange={(e) => handlePriceChange('maxPrice', e)}
              placeholder="Max"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Range Stok */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rentang Stok
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={filterOptions.minQuantity || ''}
              onChange={(e) => handleQuantityChange('minQuantity', e)}
              placeholder="Min"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            <input
              type="number"
              value={filterOptions.maxQuantity || ''}
              onChange={(e) => handleQuantityChange('maxQuantity', e)}
              placeholder="Max"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Pengurutan */}
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Urutkan
              </label>
              <select
                id="sortBy"
                value={filterOptions.sortBy}
                onChange={handleSortChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="name">Nama</option>
                <option value="price">Harga</option>
                <option value="quantity">Stok</option>
                <option value="createdAt">Tanggal</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Arah
              </label>
              <select
                id="sortOrder"
                value={filterOptions.sortOrder}
                onChange={handleSortOrderChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="asc">Naik</option>
                <option value="desc">Turun</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter; 