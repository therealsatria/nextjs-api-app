"use client";

import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Product, 
  FilterOptions, 
  CreateProductDto, 
  UpdateProductDto, 
  UpdateInventoryDto 
} from '../types';
import { useProductStore } from '../store/productStore';
import { useFilteredProducts } from '../hooks/useFilteredProducts';

// Components
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductDetail from '../components/ProductDetail';
import ProductForm from '../components/ProductForm';
import InventoryForm from '../components/InventoryForm';
import Modal from '../components/Modal';

type ModalType = 'detail' | 'add' | 'edit' | 'inventory' | null;

const ProductsPage: React.FC = () => {
  // State lokal
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Global state dari Zustand
  const {
    products,
    selectedProduct,
    loading,
    error,
    filterOptions,
    setSelectedProduct,
    setFilterOptions,
    resetFilterOptions,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    updateInventory,
    deleteProduct
  } = useProductStore();

  // Mengambil daftar produk saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Menampilkan pesan error jika terjadi kesalahan
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Filter produk berdasarkan opsi filter yang aktif
  const filteredProducts = useFilteredProducts(products, filterOptions);

  // Handler untuk menampilkan detail produk
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('detail');
  };

  // Handler untuk membuka form tambah produk
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setActiveModal('add');
  };

  // Handler untuk membuka form edit produk
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('edit');
  };

  // Handler untuk membuka form update inventori
  const handleOpenInventoryModal = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('inventory');
  };

  // Handler untuk menutup semua modal
  const handleCloseModal = () => {
    setActiveModal(null);
  };

  // Handler untuk menyimpan produk baru
  const handleCreateProduct = async (values: CreateProductDto | UpdateProductDto) => {
    try {
      // Hanya gunakan CreateProductDto saat membuat produk baru
      if ('initialQuantity' in values) {
        await createProduct(values as CreateProductDto);
        toast.success('Produk berhasil ditambahkan');
        handleCloseModal();
      }
    } catch (error) {
      toast.error('Gagal menambahkan produk');
    }
  };

  // Handler untuk memperbarui produk
  const handleUpdateProduct = async (values: UpdateProductDto) => {
    if (!selectedProduct) return;
    
    try {
      await updateProduct(selectedProduct.id, values);
      toast.success('Produk berhasil diperbarui');
      handleCloseModal();
    } catch (error) {
      toast.error('Gagal memperbarui produk');
    }
  };

  // Handler untuk memperbarui inventori
  const handleUpdateInventory = async (values: UpdateInventoryDto) => {
    if (!selectedProduct) return;
    
    try {
      await updateInventory(selectedProduct.id, values);
      toast.success('Stok berhasil diperbarui');
      handleCloseModal();
    } catch (error) {
      toast.error('Gagal memperbarui stok');
    }
  };

  // Handler untuk menghapus produk
  const handleDeleteProduct = async (productId: string) => {
    setDeletingProductId(productId);
    
    try {
      await deleteProduct(productId);
      toast.success('Produk berhasil dihapus');
      handleCloseModal();
    } catch (error) {
      toast.error('Gagal menghapus produk');
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manajemen Produk Spare Part
        </h1>
        <button
          type="button"
          onClick={handleAddProduct}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Tambah Produk
        </button>
      </div>

      {/* Filter Produk */}
      <ProductFilter
        filterOptions={filterOptions}
        onFilterChange={setFilterOptions}
        onResetFilter={resetFilterOptions}
      />

      {/* Loading indicator */}
      {loading && !deletingProductId && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Daftar Produk */}
      {!loading && (
        <ProductList
          products={filteredProducts}
          onSelectProduct={handleSelectProduct}
          onEditProduct={handleEditProduct}
          onUpdateInventory={handleOpenInventoryModal}
          onDeleteProduct={handleDeleteProduct}
          isDeleteLoading={loading && !!deletingProductId}
          deletingProductId={deletingProductId}
        />
      )}

      {/* Modals */}
      {/* Detail Produk */}
      <Modal
        isOpen={activeModal === 'detail'}
        onClose={handleCloseModal}
        size="lg"
      >
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={handleCloseModal}
            onEdit={handleEditProduct}
            onUpdateInventory={handleOpenInventoryModal}
            onDelete={handleDeleteProduct}
            isDeleteLoading={loading && deletingProductId === selectedProduct.id}
          />
        )}
      </Modal>

      {/* Form Tambah Produk */}
      <Modal
        isOpen={activeModal === 'add'}
        onClose={handleCloseModal}
        title="Tambah Produk Baru"
      >
        <div className="p-6">
          <ProductForm
            onSubmit={handleCreateProduct}
            onCancel={handleCloseModal}
            isLoading={loading}
          />
        </div>
      </Modal>

      {/* Form Edit Produk */}
      <Modal
        isOpen={activeModal === 'edit'}
        onClose={handleCloseModal}
        title="Edit Produk"
      >
        <div className="p-6">
          {selectedProduct && (
            <ProductForm
              product={selectedProduct}
              onSubmit={handleUpdateProduct}
              onCancel={handleCloseModal}
              isLoading={loading}
            />
          )}
        </div>
      </Modal>

      {/* Form Update Inventori */}
      <Modal
        isOpen={activeModal === 'inventory'}
        onClose={handleCloseModal}
        title="Perbarui Stok"
      >
        <div className="p-6">
          {selectedProduct && (
            <InventoryForm
              product={selectedProduct}
              onSubmit={handleUpdateInventory}
              onCancel={handleCloseModal}
              isLoading={loading}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProductsPage; 