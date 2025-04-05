This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Dokumentasi API Manajemen Produk dan Inventori

Aplikasi ini adalah REST API berbasis Next.js untuk manajemen produk dan inventori dengan dukungan database PostgreSQL yang dikontrol melalui Docker.

### Prasyarat

- Node.js (minimal versi 18.x)
- Docker dan Docker Compose
- npm, yarn, pnpm, atau bun

### Menjalankan Aplikasi

#### Menyiapkan Database

Aplikasi ini menggunakan PostgreSQL yang berjalan di container Docker. Gunakan script berikut untuk mengatur dan mengelola database:

1. **Memulai Database**:
   ```bash
   ./start-db.sh
   ```
   Script ini akan:
   - Meluncurkan container PostgreSQL
   - Membuat tabel `products` dan `inventory`
   - Mengatur file `.env` dengan kredensial database yang sesuai
   - Memverifikasi bahwa semua tabel telah dibuat dengan benar

2. **Menghentikan Database**:
   ```bash
   ./stop-db.sh
   ```
   Script ini akan:
   - Menghentikan container PostgreSQL
   - Menghapus volume database

#### Menjalankan Server Pengembangan

Setelah database berjalan, jalankan server pengembangan:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

Server akan berjalan di [http://localhost:3000](http://localhost:3000).

### Endpoints API

#### Pengujian Database

- **GET /api/db-test**
  - Deskripsi: Memeriksa koneksi database dan menampilkan informasi koneksi
  - Respons sukses: `200 OK` dengan detail koneksi database

#### Produk

1. **GET /api/products**
   - Deskripsi: Mendapatkan semua produk
   - Respons sukses: `200 OK` dengan array produk

2. **POST /api/products**
   - Deskripsi: Membuat produk baru
   - Body:
     ```json
     {
       "name": "Nama Produk",
       "description": "Deskripsi produk (opsional)",
       "price": 99.99,
       "initialQuantity": 10
     }
     ```
   - Respons sukses: `201 Created` dengan detail produk yang dibuat

3. **GET /api/products/:id**
   - Deskripsi: Mendapatkan produk berdasarkan ID
   - Parameter URL: `id` (UUID)
   - Respons sukses: `200 OK` dengan detail produk
   - Respons gagal: `404 Not Found` jika produk tidak ditemukan

4. **PUT /api/products/:id**
   - Deskripsi: Memperbarui produk berdasarkan ID
   - Parameter URL: `id` (UUID)
   - Body:
     ```json
     {
       "name": "Nama Produk Baru",
       "description": "Deskripsi produk baru",
       "price": 149.99
     }
     ```
   - Respons sukses: `200 OK` dengan detail produk yang diperbarui
   - Respons gagal: `404 Not Found` jika produk tidak ditemukan

5. **PATCH /api/products/:id**
   - Deskripsi: Memperbarui inventori produk berdasarkan ID
   - Parameter URL: `id` (UUID)
   - Body:
     ```json
     {
       "quantity": 20
     }
     ```
   - Respons sukses: `200 OK` dengan detail inventori yang diperbarui
   - Respons gagal: `404 Not Found` jika produk tidak ditemukan

6. **DELETE /api/products/:id**
   - Deskripsi: Menghapus produk berdasarkan ID
   - Parameter URL: `id` (UUID)
   - Respons sukses: `204 No Content`
   - Respons gagal: `404 Not Found` jika produk tidak ditemukan

#### Operasi Massal Produk

1. **POST /api/products/bulk**
   - Deskripsi: Membuat beberapa produk sekaligus
   - Body:
     ```json
     {
       "products": [
         {
           "name": "Produk 1",
           "description": "Deskripsi produk 1",
           "price": 99.99,
           "initialQuantity": 10
         },
         {
           "name": "Produk 2",
           "description": "Deskripsi produk 2",
           "price": 149.99,
           "initialQuantity": 20
         }
       ]
     }
     ```
   - Respons sukses: `201 Created` dengan detail produk yang dibuat

2. **DELETE /api/products/bulk**
   - Deskripsi: Menghapus beberapa produk sekaligus
   - Body:
     ```json
     {
       "ids": ["id1", "id2", "id3"]
     }
     ```
   - Respons sukses: `204 No Content`

#### Inventori

1. **GET /api/inventory**
   - Deskripsi: Mendapatkan semua data inventori
   - Respons sukses: `200 OK` dengan array data inventori

2. **POST /api/inventory**
   - Deskripsi: Membuat entri inventori baru
   - Body:
     ```json
     {
       "productId": "UUID produk",
       "quantity": 10
     }
     ```
   - Respons sukses: `201 Created` dengan detail inventori yang dibuat

3. **GET /api/inventory/:id**
   - Deskripsi: Mendapatkan inventori berdasarkan ID
   - Parameter URL: `id` (UUID)
   - Respons sukses: `200 OK` dengan detail inventori
   - Respons gagal: `404 Not Found` jika inventori tidak ditemukan

4. **PUT /api/inventory/:id**
   - Deskripsi: Memperbarui inventori berdasarkan ID
   - Parameter URL: `id` (UUID)
   - Body:
     ```json
     {
       "quantity": 25
     }
     ```
   - Respons sukses: `200 OK` dengan detail inventori yang diperbarui
   - Respons gagal: `404 Not Found` jika inventori tidak ditemukan

5. **DELETE /api/inventory/:id**
   - Deskripsi: Menghapus inventori berdasarkan ID
   - Parameter URL: `id` (UUID)
   - Respons sukses: `204 No Content`
   - Respons gagal: `404 Not Found` jika inventori tidak ditemukan

### Format Respons API

Semua respons API mengikuti format standar berikut:

#### Sukses
```json
{
  "success": true,
  "data": {...},
  "message": "Pesan sukses (opsional)"
}
```

#### Error
```json
{
  "success": false,
  "error": "Pesan error",
  "details": {...} // Detail tambahan (opsional)
}
```

### Struktur Database

#### Tabel Products
- `id` (UUID) - Primary Key
- `name` (VARCHAR) - Nama produk
- `description` (TEXT) - Deskripsi produk (opsional)
- `price` (DECIMAL) - Harga produk
- `created_at` (TIMESTAMP) - Waktu pembuatan

#### Tabel Inventory
- `id` (UUID) - Primary Key
- `product_id` (UUID) - Foreign Key ke Products
- `quantity` (INTEGER) - Jumlah stok
- `updated_at` (TIMESTAMP) - Waktu pembaruan terakhir

### Alur Pengembangan Umum

1. Mulai PostgreSQL dengan `./start-db.sh`
2. Jalankan server Next.js dengan `npm run dev`
3. Gunakan API sesuai dengan dokumentasi di atas
4. Setelah selesai, hentikan database dengan `./stop-db.sh`

