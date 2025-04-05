'use client';

import { create } from 'zustand';
import { Product, FilterOptions, UpdateProductDto, CreateProductDto, UpdateInventoryDto } from '../types';
import { productApi } from '../services/api';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filterOptions: FilterOptions;
  
  // Actions untuk mengubah state
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilterOptions: (options: Partial<FilterOptions>) => void;
  resetFilterOptions: () => void;

  // Actions untuk berinteraksi dengan API
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (product: CreateProductDto) => Promise<void>;
  updateProduct: (id: string, product: UpdateProductDto) => Promise<void>;
  updateInventory: (id: string, inventory: UpdateInventoryDto) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const defaultFilterOptions: FilterOptions = {
  search: '',
  minPrice: undefined,
  maxPrice: undefined,
  minQuantity: undefined,
  maxQuantity: undefined,
  sortBy: 'name',
  sortOrder: 'asc'
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filterOptions: defaultFilterOptions,

  // Actions untuk mengubah state
  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilterOptions: (options) => set({ 
    filterOptions: { ...get().filterOptions, ...options } 
  }),
  resetFilterOptions: () => set({ filterOptions: defaultFilterOptions }),

  // Actions untuk berinteraksi dengan API
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await productApi.getAll();
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Gagal mengambil data produk', 
        loading: false 
      });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await productApi.getById(id);
      set({ selectedProduct: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Gagal mengambil detail produk', 
        loading: false 
      });
    }
  },

  createProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const response = await productApi.create(product);
      set({ 
        products: [...get().products, response.data],
        selectedProduct: response.data,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Gagal membuat produk baru', 
        loading: false 
      });
    }
  },

  updateProduct: async (id, product) => {
    set({ loading: true, error: null });
    try {
      const response = await productApi.update(id, product);
      const updatedProducts = get().products.map(p => 
        p.id === id ? response.data : p
      );
      set({ 
        products: updatedProducts,
        selectedProduct: response.data,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Gagal memperbarui produk', 
        loading: false 
      });
    }
  },

  updateInventory: async (id, inventory) => {
    set({ loading: true, error: null });
    try {
      const response = await productApi.updateInventory(id, inventory);
      // Update produk dalam daftar
      const updatedProducts = get().products.map(p => {
        if (p.id === id) {
          return { 
            ...p, 
            inventory: {
              ...p.inventory,
              ...response.data
            }
          };
        }
        return p;
      });
      
      // Update produk yang dipilih jika ada
      const selectedProduct = get().selectedProduct;
      let updatedSelectedProduct = selectedProduct;
      if (selectedProduct && selectedProduct.id === id) {
        updatedSelectedProduct = {
          ...selectedProduct,
          inventory: {
            ...selectedProduct.inventory,
            ...response.data
          }
        };
      }
      
      set({ 
        products: updatedProducts,
        selectedProduct: updatedSelectedProduct,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Gagal memperbarui inventori', 
        loading: false 
      });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await productApi.delete(id);
      const updatedProducts = get().products.filter(p => p.id !== id);
      set({ 
        products: updatedProducts,
        selectedProduct: get().selectedProduct?.id === id ? null : get().selectedProduct,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Gagal menghapus produk', 
        loading: false 
      });
    }
  }
})); 