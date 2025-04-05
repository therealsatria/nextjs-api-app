'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Product, UpdateInventoryDto } from '../types';

interface InventoryFormProps {
  product: Product;
  onSubmit: (values: UpdateInventoryDto) => void;
  onCancel: () => void;
  isLoading: boolean;
}

// Skema validasi form
const inventoryValidationSchema = Yup.object().shape({
  quantity: Yup.number()
    .required('Jumlah stok wajib diisi')
    .min(0, 'Jumlah stok minimal 0')
    .integer('Jumlah stok harus berupa angka bulat')
    .typeError('Jumlah stok harus berupa angka')
});

const InventoryForm: React.FC<InventoryFormProps> = ({ 
  product, 
  onSubmit, 
  onCancel,
  isLoading
}) => {
  const initialValues: UpdateInventoryDto = {
    quantity: product.inventory?.quantity || 0
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={inventoryValidationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          <div>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {product.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {product.description || 'Tidak ada deskripsi'}
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                Harga: Rp {product.price.toLocaleString('id-ID')}
              </p>
            </div>

            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Jumlah Stok *
            </label>
            <Field
              type="number"
              name="quantity"
              id="quantity"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm ${
                errors.quantity && touched.quantity ? 'border-red-500' : ''
              }`}
              placeholder="Masukkan jumlah stok"
            />
            <ErrorMessage name="quantity" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
          </div>

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
                'Perbarui Stok'
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InventoryForm; 