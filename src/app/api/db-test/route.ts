import { NextRequest } from 'next/server';
import { pool } from '@/infrastructure/database/db-config';
import { ResponseHandler } from '@/utils/response-handler';

export async function GET(request: NextRequest) {
  try {
    // Record start time
    const startTime = performance.now();

    // Test the database connection with a simple query
    const result = await pool.query('SELECT NOW() as current_time');

    // Calculate response time in milliseconds with 2 decimal places
    const responseTimeMs = Number((performance.now() - startTime).toFixed(2));

    // Gather connection details and status
    const connectionInfo = {
      status: 'Connected',
      host: process.env.DB_HOST || 'Not specified',
      user: process.env.DB_USER || 'Not specified',
      database: process.env.DB_NAME || 'Not specified',
      port: process.env.DB_PORT || 'Not specified',
      currentTime: result.rows[0].current_time.toISOString(),
      responseTimeMs, // Response time in milliseconds with 2 decimal places
    };

    return ResponseHandler.success(connectionInfo, 'Database connection test successful');
  } catch (error) {
    // If the connection fails, return error details with a zero response time
    const connectionInfo = {
      status: 'Failed',
      host: process.env.DB_HOST || 'Not specified',
      user: process.env.DB_USER || 'Not specified',
      database: process.env.DB_NAME || 'Not specified',
      port: process.env.DB_PORT || 'Not specified',
      responseTimeMs: 0.00, // Fixed to 2 decimal places
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    return ResponseHandler.error(error, connectionInfo, 500);
  }
}