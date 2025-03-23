#!/bin/bash

# Define the project root (assuming script is in the project root)
PROJECT_ROOT="."

# Check if docker-compose.yml exists
if [ ! -f "$PROJECT_ROOT/docker-compose.yml" ]; then
  echo "Error: docker-compose.yml not found in $PROJECT_ROOT."
  echo "Please ensure it exists with the PostgreSQL configuration."
  exit 1
fi

# Start the PostgreSQL container
echo "Starting PostgreSQL container..."
docker-compose up -d

# Wait for the container to be ready (up to 10 seconds)
echo "Waiting for PostgreSQL to be ready..."
for i in {1..10}; do
  if docker ps | grep -q "product_postgres"; then
    echo "PostgreSQL container is running."
    break
  fi
  sleep 1
done

if ! docker ps | grep -q "product_postgres"; then
  echo "Error: PostgreSQL container failed to start."
  echo "Check logs with: docker-compose logs postgres"
  exit 1
fi

# SQL commands to initialize the database
SQL_COMMANDS="
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"

# Execute SQL commands inside the PostgreSQL container
echo "Initializing database and tables..."
echo "$SQL_COMMANDS" | docker exec -i product_postgres psql -U postgres -d product_db

if [ $? -eq 0 ]; then
  echo "Database initialized successfully."
else
  echo "Error: Failed to initialize the database."
  docker-compose logs postgres
  exit 1
fi

# Query to verify table creation
TABLE_CHECK="SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"

# Execute the query and check for tables
echo "Verifying database creation..."
TABLES=$(echo "$TABLE_CHECK" | docker exec -i product_postgres psql -U postgres -d product_db -t -A)

# Check if 'products' and 'inventory' tables exist
if echo "$TABLES" | grep -q "products" && echo "$TABLES" | grep -q "inventory"; then
  echo "Database verification successful: 'products' and 'inventory' tables exist."
else
  echo "Database verification failed: One or both tables ('products', 'inventory') are missing."
  echo "Tables found: $TABLES"
  docker-compose logs postgres
  exit 1
fi

echo "Database setup complete! You can now start your app with 'npm run dev'."