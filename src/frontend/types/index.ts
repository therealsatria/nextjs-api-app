export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  inventory?: Inventory;
}

export interface Inventory {
  id: string;
  productId: string;
  quantity: number;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  initialQuantity: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
}

export interface UpdateInventoryDto {
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: Record<string, any>;
}

export interface ApiError {
  success: false;
  error: string;
  details?: Record<string, any>;
}

export interface FilterOptions {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
  sortBy: 'name' | 'price' | 'quantity' | 'createdAt';
  sortOrder: 'asc' | 'desc';
} 