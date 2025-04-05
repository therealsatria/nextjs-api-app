# API Spare Part Mobil Listrik

Dokumentasi API untuk aplikasi manajemen spare part mobil listrik.

## Mengimpor Collection ke Insomnia

File [insomnia-api-collection.json](./insomnia-api-collection.json) telah dibuat untuk memudahkan pengujian API. Berikut langkah-langkah untuk mengimpornya ke Insomnia:

1. Pastikan Anda sudah menginstal [Insomnia](https://insomnia.rest/download)
2. Buka aplikasi Insomnia
3. Klik menu Application (ikon roda gigi)
4. Pilih **Preferences**
5. Pilih tab **Data**
6. Klik **Import Data** > **From File**
7. Pilih file **insomnia-api-collection.json** dari proyek ini
8. Klik **Import**

Setelah diimpor, Anda akan memiliki collection lengkap dengan folder-folder yang terorganisir:
- **Products**: Endpoint untuk manajemen produk spare part
- **Inventory**: Endpoint untuk manajemen stok produk
- **Database**: Endpoint untuk memeriksa status koneksi database

## Mengatur Environment

Collection ini dilengkapi dengan dua environment:
- **Development**: Menggunakan base URL http://localhost:3000
- **Production**: Menggunakan base URL https://api-spare-parts.example.com (ubah sesuai kebutuhan)

Untuk mengubah environment yang aktif:
1. Klik dropdown environment di pojok kanan atas Insomnia
2. Pilih environment yang ingin digunakan (Development atau Production)

## Variabel Environment

Collection ini menggunakan variabel berikut:
- `base_url`: URL dasar API
- `product_id`: ID produk untuk testing
- `inventory_id`: ID inventori untuk testing

Anda perlu memperbarui nilai `product_id` dan `inventory_id` setelah membuat produk dan inventori baru melalui API.

## Endpoint yang Tersedia

### Products
- `GET /api/products`: Mendapatkan semua produk
- `POST /api/products`: Membuat produk baru
- `GET /api/products/:id`: Mendapatkan detail produk berdasarkan ID
- `PUT /api/products/:id`: Memperbarui produk berdasarkan ID
- `PATCH /api/products/:id`: Memperbarui inventori produk berdasarkan ID
- `DELETE /api/products/:id`: Menghapus produk berdasarkan ID
- `POST /api/products/bulk`: Membuat beberapa produk sekaligus
- `DELETE /api/products/bulk`: Menghapus beberapa produk sekaligus

### Inventory
- `GET /api/inventory`: Mendapatkan semua inventori
- `POST /api/inventory`: Membuat inventori baru
- `GET /api/inventory/:id`: Mendapatkan detail inventori berdasarkan ID
- `PUT /api/inventory/:id`: Memperbarui inventori berdasarkan ID
- `DELETE /api/inventory/:id`: Menghapus inventori berdasarkan ID

### Database
- `GET /api/db-test`: Memeriksa dan menampilkan status koneksi database

## Alur Pengujian yang Disarankan

1. Periksa koneksi database dengan endpoint `GET /api/db-test`
2. Buat produk baru dengan endpoint `POST /api/products`
3. Catat ID produk yang baru dibuat dan perbarui variabel `product_id` di environment
4. Dapatkan semua produk dengan endpoint `GET /api/products`
5. Dapatkan detail produk dengan ID tertentu menggunakan `GET /api/products/:id`
6. Perbarui produk dengan endpoint `PUT /api/products/:id`
7. Perbarui stok produk dengan endpoint `PATCH /api/products/:id`
8. Buat inventori baru dengan endpoint `POST /api/inventory` jika diperlukan
9. Catat ID inventori dan perbarui variabel `inventory_id` di environment
10. Lakukan operasi lain sesuai kebutuhan

Untuk informasi lebih detail tentang format request dan response, silakan lihat dokumentasi API di halaman utama aplikasi.

