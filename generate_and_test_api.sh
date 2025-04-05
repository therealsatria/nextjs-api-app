#!/bin/bash

# Konfigurasi
API_URL="http://localhost:3000/api"
PRODUCTS_ENDPOINT="${API_URL}/products"
INVENTORY_ENDPOINT="${API_URL}/inventory"
TOTAL_ITEMS=10
UUID_FILE="uuid_data.txt"

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fungsi untuk menampilkan pesan dengan format
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Array data spare part mobil listrik
SPARE_PARTS=(
  "Battery Pack 75kWh|Baterai lithium-ion 75kWh untuk mobil listrik premium|8500000"
  "Electric Motor AC|Motor AC 150kW untuk penggerak utama|6750000"
  "Controller Unit|Unit pengontrol sistem elektronik mobil listrik|3250000"
  "Power Inverter|Pengubah arus DC ke AC untuk motor|2800000"
  "On-board Charger|Charger onboard 11kW untuk pengisian daya|1900000"
  "BMS (Battery Management System)|Sistem manajemen dan monitoring baterai|4200000"
  "DC-DC Converter|Konverter listrik 400V ke 12V|1450000"
  "Charging Port|Port pengisian daya Type 2 CCS Combo|850000"
  "Cooling System|Sistem pendingin baterai dan komponen elektronik|3200000"
  "Regenerative Braking Module|Modul pengereman regeneratif untuk pengisian baterai|2650000"
  "Drive Shaft EV|Poros penggerak khusus mobil listrik|1750000"
  "EV Wiring Harness|Set kabel khusus tegangan tinggi mobil listrik|2100000"
  "Thermal Management Unit|Unit pengatur suhu komponen elektronik|2950000"
  "High Voltage Junction Box|Junction box untuk sistem tegangan tinggi|1850000"
  "EV Contactor|Kontaktor sistem tegangan tinggi|1250000"
)

# Hapus file UUID jika sudah ada
if [ -f "$UUID_FILE" ]; then
  rm "$UUID_FILE"
fi

# Tunggu API siap
log_info "Menunggu API server siap..."
until $(curl --output /dev/null --silent --head --fail ${API_URL}/db-test); do
  printf '.'
  sleep 2
done
log_success "API server siap!"

# ============== PRODUCTS API ==============

log_info "============== MEMULAI PENGUJIAN PRODUCTS API =============="

# 1. Generate dummy spare part products
log_info "Generating ${TOTAL_ITEMS} spare part products untuk mobil listrik..."
for i in $(seq 0 $(($TOTAL_ITEMS - 1))); do
  index=$(($i % ${#SPARE_PARTS[@]}))
  IFS='|' read -r name description base_price <<< "${SPARE_PARTS[$index]}"
  
  # Tambahkan variasi harga (±10%)
  price_variation=$(echo "scale=2; $base_price * (0.9 + 0.2 * $RANDOM / 32767)" | bc)
  price=${price_variation%.*}  # Hapus desimal untuk request API
  
  # Random quantity antara 5-30
  quantity=$(( RANDOM % 25 + 5 ))
  
  response=$(curl -s -X POST $PRODUCTS_ENDPOINT \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"${name}\",
      \"description\": \"${description}\",
      \"price\": ${price},
      \"initialQuantity\": ${quantity}
    }")
  
  # Extract product ID from response
  product_id=$(echo $response | grep -o '"id":"[^"]*' | cut -d'"' -f4)
  
  if [ ! -z "$product_id" ]; then
    echo "product:$product_id" >> $UUID_FILE
    log_success "Created product: ${name} with ID: ${product_id}"
  else
    log_error "Failed to create product: ${name}"
    echo $response
  fi
  
  # Tunggu sebentar untuk menghindari rate limiting
  sleep 0.5
done

# 2. Get all products
log_info "Getting all products..."
curl -s -X GET $PRODUCTS_ENDPOINT | jq '.' || echo "Failed to get products"

# 3. Get product by ID
log_info "Getting products by ID..."
grep "product" $UUID_FILE | while read -r line; do
  id=${line#*:}
  log_info "Getting product with ID: ${id}"
  curl -s -X GET "${PRODUCTS_ENDPOINT}/${id}" | jq '.'
  sleep 0.5
done

# 4. Update products by ID
log_info "Updating products by ID dengan informasi yang lebih lengkap..."
count=0
grep "product" $UUID_FILE | while read -r line; do
  id=${line#*:}
  index=$(($count % ${#SPARE_PARTS[@]}))
  IFS='|' read -r name description base_price <<< "${SPARE_PARTS[$index]}"
  
  # Tambahkan informasi garansi dan spesifikasi
  warranty_months=$(( RANDOM % 24 + 12 ))
  updated_price=$(echo "scale=2; $base_price * 1.05" | bc | cut -d. -f1)  # Harga naik 5%
  
  warranty_info="Garansi resmi ${warranty_months} bulan, termasuk layanan penggantian"
  additional_specs="Kompatibel dengan semua model EV tipe ${(RANDOM % 3) + 1}, sertifikasi ISO 9001:2015"
  updated_description="${description}. ${warranty_info}. ${additional_specs}"
  
  log_info "Updating product with ID: ${id}"
  response=$(curl -s -X PUT "${PRODUCTS_ENDPOINT}/${id}" \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"${name} - Premium Edition\",
      \"description\": \"${updated_description}\",
      \"price\": ${updated_price}
    }")
  
  echo $response | jq '.'
  count=$((count+1))
  sleep 0.5
done

# ============== INVENTORY API ==============

log_info "============== MEMULAI PENGUJIAN INVENTORY API =============="

# 1. Generate inventory records untuk spare parts
log_info "Generating inventory records untuk spare part mobil listrik..."
i=0
grep "product" $UUID_FILE | while read -r line && [ $i -lt $TOTAL_ITEMS ]; do
  product_id=${line#*:}
  
  # Jumlah stok bervariasi berdasarkan tipe item
  if [ $i -lt 3 ]; then
    # High-value parts (stock rendah)
    quantity=$(( RANDOM % 10 + 3 ))
  elif [ $i -lt 7 ]; then
    # Medium-value parts (stock sedang)
    quantity=$(( RANDOM % 20 + 10 ))
  else
    # Low-value parts (stock tinggi)
    quantity=$(( RANDOM % 50 + 30 ))
  fi
  
  response=$(curl -s -X POST $INVENTORY_ENDPOINT \
    -H "Content-Type: application/json" \
    -d "{
      \"productId\": \"${product_id}\",
      \"quantity\": ${quantity}
    }")
  
  # Extract inventory ID
  inventory_id=$(echo $response | grep -o '"id":"[^"]*' | cut -d'"' -f4)
  
  if [ ! -z "$inventory_id" ]; then
    echo "inventory:$inventory_id" >> $UUID_FILE
    log_success "Created inventory dengan ID: ${inventory_id} untuk product ID: ${product_id} (Jumlah: ${quantity})"
  else
    log_error "Failed to create inventory untuk product ID: ${product_id}"
    echo $response
  fi
  
  i=$((i+1))
  sleep 0.5
done

# 2. Get all inventory items
log_info "Getting all inventory items..."
curl -s -X GET $INVENTORY_ENDPOINT | jq '.' || echo "Failed to get inventory items"

# 3. Get inventory by ID
log_info "Getting inventory items by ID..."
grep "inventory" $UUID_FILE | while read -r line; do
  id=${line#*:}
  log_info "Getting inventory with ID: ${id}"
  curl -s -X GET "${INVENTORY_ENDPOINT}/${id}" | jq '.'
  sleep 0.5
done

# 4. Update inventory by ID (simulasi update stok)
log_info "Updating inventory items untuk simulasi perubahan stok..."
i=0
grep "inventory" $UUID_FILE | while read -r line; do
  id=${line#*:}
  
  # Simulasi berbagai perubahan stok
  if [ $i -lt 3 ]; then
    # Simulasi pengurangan stok karena penjualan
    change=-$(( RANDOM % 3 + 1 ))
    change_type="penjualan"
  elif [ $i -lt 7 ]; then
    # Simulasi penambahan stok dari supplier
    change=$(( RANDOM % 15 + 5 ))
    change_type="pengadaan baru"
  else
    # Simulasi relokasi stok antar gudang
    change=$(( RANDOM % 10 - 5 ))
    change_type="relokasi antar gudang"
  fi
  
  # Dapatkan stok saat ini
  current_inventory=$(curl -s -X GET "${INVENTORY_ENDPOINT}/${id}")
  current_quantity=$(echo $current_inventory | grep -o '"quantity":[0-9]*' | cut -d: -f2)
  
  # Hitung jumlah stok baru (pastikan tidak negatif)
  new_quantity=$(( current_quantity + change ))
  if [ $new_quantity -lt 0 ]; then
    new_quantity=0
  fi
  
  log_info "Updating inventory ID: ${id} ke jumlah: ${new_quantity} (${change_type})"
  response=$(curl -s -X PUT "${INVENTORY_ENDPOINT}/${id}" \
    -H "Content-Type: application/json" \
    -d "{
      \"quantity\": ${new_quantity}
    }")
  
  echo $response | jq '.'
  i=$((i+1))
  sleep 0.5
done

# ============== CLEAN UP (OPTIONAL) ==============
# Uncomment the following section if you want to delete the created data

# log_info "Cleaning up..."
# grep "product" $UUID_FILE | while read -r line; do
#   id=${line#*:}
#   log_info "Deleting product with ID: ${id}"
#   curl -s -X DELETE "${PRODUCTS_ENDPOINT}/${id}"
#   sleep 0.2
# done

# grep "inventory" $UUID_FILE | while read -r line; do
#   id=${line#*:}
#   log_info "Deleting inventory with ID: ${id}"
#   curl -s -X DELETE "${INVENTORY_ENDPOINT}/${id}"
#   sleep 0.2
# done

log_success "Script selesai! Data spare part mobil listrik telah dibuat. Data IDs disimpan di ${UUID_FILE}" 