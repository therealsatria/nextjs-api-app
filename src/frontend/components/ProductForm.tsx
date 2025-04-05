'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Product, CreateProductDto, UpdateProductDto } from '../types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (values: CreateProductDto | UpdateProductDto) => void;
  onCancel: () => void;
  isLoading: boolean;
}

// Skema validasi form
const productValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nama produk wajib diisi')
    .max(100, 'Nama produk maksimal 100 karakter'),
  description: Yup.string()
    .max(500, 'Deskripsi maksimal 500 karakter'),
  price: Yup.number()
    .required('Harga wajib diisi')
    .positive('Harga harus bernilai positif')
    .typeError('Harga harus berupa angka'),
  initialQuantity: Yup.number()
    .when('$isCreating', {
      is: true,
      then: (schema) => schema
        .required('Jumlah stok awal wajib diisi')
        .min(0, 'Jumlah stok minimal 0')
        .integer('Jumlah stok harus berupa angka bulat')
        .typeError('Jumlah stok harus berupa angka'),
      otherwise: (schema) => schema
    })
});

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  onSubmit, 
  onCancel,
  isLoading
}) => {
  const isCreating = !product;
  
  const initialValues: CreateProductDto | UpdateProductDto = isCreating
    ? {
        name: '',
        description: '',
        price: 0,
        initialQuantity: 0
      }
    : {
        name: product.name,
        description: product.description,
        price: product.price
      };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      validationContext={{ isCreating }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nama Produk *
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm ${
                errors.name && touched.name ? 'border-red-500' : ''
              }`}
              placeholder="Masukkan nama produk"
            />
            <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Deskripsi
            </label>
            <Field
              as="textarea"
              name="description"
              id="description"
              rows={3}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm ${
                errors.description && touched.description ? 'border-red-500' : ''
              }`}
              placeholder="Masukkan deskripsi produk"
            />
            <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Harga (Rp) *
            </label>
            <Field
              type="number"
              name="price"
              id="price"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm ${
                errors.price && touched.price ? 'border-red-500' : ''
              }`}
              placeholder="Masukkan harga produk"
            />
            <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
          </div>

          {isCreating && (
            <div>
              <label htmlFor="initialQuantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stok Awal *
              </label>
              <Field
                type="number"
                name="initialQuantity"
                id="initialQuantity"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm ${
                  (errors as any).initialQuantity && (touched as any).initialQuantity ? 'border-red-500' : ''
                }`}
                placeholder="Masukkan jumlah stok awal"
              />
              <ErrorMessage name="initialQuantity" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                'Simpan'
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm; 