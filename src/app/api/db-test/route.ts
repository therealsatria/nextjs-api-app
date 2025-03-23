import { NextRequest } from 'next/server';
import { pool, checkConnection } from '@/infrastructure/database/db-config';
import { ResponseHandler } from '@/utils/response-handler';

export async function GET(request: NextRequest) {
  try {
    // Record start time
    const startTime = performance.now();

    // Test the database connection
    const isConnected = await checkConnection();
    const result = isConnected ? await pool.query('SELECT NOW() as current_time') : null;

    // Calculate response time in milliseconds with 2 decimal places
    const responseTimeMs = Number((performance.now() - startTime).toFixed(2));

    // Gather connection details and status
    const connectionInfo = {
      status: isConnected ? 'Connected' : 'Disconnected',
      host: process.env.DB_HOST || 'Not specified',
      user: process.env.DB_USER || 'Not specified',
      database: process.env.DB_NAME || 'Not specified',
      port: process.env.DB_PORT || 'Not specified',
      currentTime: result ? result.rows[0].current_time.toISOString() : null,
      responseTimeMs,
    };

    if (isConnected) {
      return ResponseHandler.success(connectionInfo, 'Database connection test successful');
    } else {
      return ResponseHandler.success(connectionInfo, 'Database is disconnected, but app is running');
    }
  } catch (error) {
    // Handle unexpected errors during the test
    const connectionInfo = {
      status: 'Failed',
      host: process.env.DB_HOST || 'Not specified',
      user: process.env.DB_USER || 'Not specified',
      database: process.env.DB_NAME || 'Not specified',
      port: process.env.DB_PORT || 'Not specified',
      responseTimeMs: 0.00,
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    return ResponseHandler.error(error, connectionInfo, 500);
  }
}