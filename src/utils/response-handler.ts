import { NextResponse } from 'next/server';

interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: Record<string, any>;
}

interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, any>;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export class ResponseHandler {
  static success<T>(
    data: T,
    message?: string,
    meta?: Record<string, any>,
    status: number = 200
  ): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        data,
        message: message || 'Operation successful',
        meta,
      },
      { status }
    );
  }

  static error(
    error: unknown, // Changed to accept unknown
    details?: Record<string, any>,
    status: number = 500
  ): NextResponse<ApiResponse<any>> {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error !== null && typeof error === 'object' && 'message' in error) {
      errorMessage = (error as { message: string }).message;
    }
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details,
      },
      { status }
    );
  }

  static created<T>(
    data: T,
    message: string = 'Resource created successfully'
  ): NextResponse<ApiResponse<T>> {
    return this.success(data, message, undefined, 201);
  }

  static noContent(message: string = 'Resource deleted successfully'): NextResponse<ApiResponse<null>> {
    return this.success(null, message, undefined, 204);
  }
}