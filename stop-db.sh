#!/bin/bash

# Define the project root (assuming script is in the project root)
PROJECT_ROOT="."

# Check if docker-compose.yml exists
if [ ! -f "$PROJECT_ROOT/docker-compose.yml" ]; then
  echo "Error: docker-compose.yml not found in $PROJECT_ROOT."
  echo "Please ensure it exists with the PostgreSQL configuration."
  exit 1
fi

# Stop the PostgreSQL container and remove the volume
echo "Stopping PostgreSQL container and removing volume..."
docker-compose down -v

if [ $? -eq 0 ]; then
  echo "PostgreSQL container stopped and volume removed successfully."
else
  echo "Error: Failed to stop the container or remove the volume."
  docker-compose logs postgres
  exit 1
fi

echo "Database cleanup complete!"