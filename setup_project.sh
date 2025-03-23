#!/bin/bash

# Define the project root (assuming we're already in the project directory)
PROJECT_ROOT="."

# Ensure we're in a Next.js project directory
if [ ! -f "package.json" ] || ! grep -q "next" package.json; then
  echo "Error: This doesn’t appear to be a Next.js project directory. Please run 'npm create-next-app@latest' first."
  exit 1
fi

# Create the src directory and its subdirectories
mkdir -p src/{app/api/products/[id],domain/{entities,dtos},infrastructure/{database,repositories},services,utils,types,middleware}

# Move existing app/ content to src/app/ (if app/ exists from initial setup)
if [ -d "app" ]; then
  mv app/* src/app/
  rmdir app
fi

# Create files in src/app/api
touch src/app/api/products/route.ts
touch src/app/api/products/[id]/route.ts

# Create files in src/domain/entities
touch src/domain/entities/product.ts

# Create files in src/domain/dtos
touch src/domain/dtos/product.dto.ts
touch src/domain/dtos/inventory.dto.ts

# Create files in src/infrastructure/database
touch src/infrastructure/database/db-config.ts

# Create files in src/infrastructure/repositories
touch src/infrastructure/repositories/product.repository.ts
touch src/infrastructure/repositories/inventory.repository.ts

# Create files in src/services
touch src/services/product.service.ts

# Create files in src/utils
touch src/utils/response-handler.ts

# Create files in src/types
touch src/types/index.ts

# Create files in src/middleware
touch src/middleware/validation.ts

# Add .env file with PostgreSQL credentials matching the Docker container
cat <<EOL > .env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=product_db
DB_PASSWORD=password123
DB_PORT=5432
EOL

# Update package.json to include additional dependencies
npm install pg uuid
npm install -D @types/pg @types/uuid

# Create a docker-compose.yml file for PostgreSQL
touch docker-compose.yml
cat <<EOL > docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    container_name: product_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: product_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
EOL

# Print success message with instructions
echo "Project structure updated successfully in $PROJECT_ROOT!"
echo "Next steps:"
echo "1. Copy the implementation code into the respective files"
echo "   - Use src/app/api/ for API routes (App Router)"
echo "   - Update imports to use @/* alias (e.g., '@/infrastructure/repositories/product.repository')"
echo "2. Start the PostgreSQL container with Docker:"
echo "   docker-compose up -d"
echo "3. npm run dev to start the development server"
echo "To stop the PostgreSQL container later:"
echo "   docker-compose down"
echo "To stop and remove the volume (reset data):"
echo "   docker-compose down -v"
echo "Optional scripts:"
echo "   - Run './init-db.sh' to initialize the database (after Docker is running)"
echo "   - Run './test-db.sh' to verify database creation"