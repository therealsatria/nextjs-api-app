'use client';

import { useMemo } from 'react';
import { Product, FilterOptions } from '../types';

/**
 * Hook untuk memfilter dan mengurutkan daftar produk berdasarkan option filter
 */
export const useFilteredProducts = (
  products: Product[],
  filterOptions: FilterOptions
): Product[] => {
  return useMemo(() => {
    let filteredProducts = [...products];

    // Filter berdasarkan pencarian
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }

    // Filter berdasarkan rentang harga
    if (filterOptions.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= filterOptions.minPrice!
      );
    }
    
    if (filterOptions.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= filterOptions.maxPrice!
      );
    }
    
    // Filter berdasarkan jumlah stok
    if (filterOptions.minQuantity !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.inventory && product.inventory.quantity >= filterOptions.minQuantity!
      );
    }
    
    if (filterOptions.maxQuantity !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.inventory && product.inventory.quantity <= filterOptions.maxQuantity!
      );
    }

    // Mengurutkan produk
    filteredProducts.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (filterOptions.sortBy) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'price':
          valueA = a.price;
          valueB = b.price;
          break;
        case 'quantity':
          valueA = a.inventory?.quantity ?? 0;
          valueB = b.inventory?.quantity ?? 0;
          break;
        case 'createdAt':
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;
        default:
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
      }

      if (valueA < valueB) return filterOptions.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return filterOptions.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filteredProducts;
  }, [products, filterOptions]);
}; 