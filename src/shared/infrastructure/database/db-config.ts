import { Pool } from 'pg';

// Database connection pool
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// Function to initialize the database with retry logic
async function initializeDatabaseWithRetry(retries = 5, delayMs = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pool.query(`
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
      `);
      console.log('Database initialized successfully');
      return; // Exit the function on success
    } catch (error) {
      console.error(`Database initialization failed (attempt ${attempt}/${retries}):`, error);
      if (attempt === retries) {
        console.error('Max retries reached. Database initialization failed. The app will continue running.');
        return; // Stop retrying but don't crash
      }
      console.log(`Retrying in ${delayMs / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delayMs)); // Wait before retrying
    }
  }
}

// Function to start the initialization process in the background
async function startDatabaseInitialization() {
  console.log('Starting database initialization...');
  await initializeDatabaseWithRetry();
}

// Run initialization in the background without blocking the app
startDatabaseInitialization().catch(error => {
  console.error('Unexpected error during database initialization:', error);
  // No process.exit here; app continues running
});

// Optional: Export a function to check connection status manually
export async function checkConnection(): Promise<boolean> {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
} 