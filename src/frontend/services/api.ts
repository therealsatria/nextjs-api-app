import { 
  ApiError, 
  ApiResponse, 
  CreateProductDto, 
  Product, 
  UpdateInventoryDto, 
  UpdateProductDto 
} from '../types';

const API_BASE_URL = '/api';

/**
 * Fungsi utilitas untuk melakukan request ke API
 */
async function fetchApi<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  // Khusus untuk 204 No Content, langsung kembalikan null
  if (response.status === 204) {
    return null as T;
  }

  // Cek jika response bukan JSON (untuk menangani 204 No Content)
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return null as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw data as ApiError;
  }

  return data as T;
}

/**
 * API untuk manajemen produk
 */
export const productApi = {
  // Mendapatkan semua produk
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    return fetchApi<ApiResponse<Product[]>>('/products');
  },

  // Mendapatkan produk berdasarkan ID
  getById: async (id: string): Promise<ApiResponse<Product>> => {
    return fetchApi<ApiResponse<Product>>(`/products/${id}`);
  },

  // Membuat produk baru
  create: async (product: CreateProductDto): Promise<ApiResponse<Product>> => {
    return fetchApi<ApiResponse<Product>>('/products', 'POST', product);
  },

  // Memperbarui produk
  update: async (id: string, product: UpdateProductDto): Promise<ApiResponse<Product>> => {
    return fetchApi<ApiResponse<Product>>(`/products/${id}`, 'PUT', product);
  },

  // Memperbarui stok inventori produk
  updateInventory: async (id: string, inventory: UpdateInventoryDto): Promise<ApiResponse<any>> => {
    return fetchApi<ApiResponse<any>>(`/products/${id}`, 'PATCH', inventory);
  },

  // Menghapus produk
  delete: async (id: string): Promise<void> => {
    return fetchApi<void>(`/products/${id}`, 'DELETE');
  },

  // Membuat banyak produk sekaligus
  bulkCreate: async (products: CreateProductDto[]): Promise<ApiResponse<Product[]>> => {
    return fetchApi<ApiResponse<Product[]>>('/products/bulk', 'POST', { products });
  },

  // Menghapus banyak produk sekaligus
  bulkDelete: async (ids: string[]): Promise<void> => {
    return fetchApi<void>('/products/bulk', 'DELETE', { ids });
  }
}; 