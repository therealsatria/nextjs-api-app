import { NextRequest, NextResponse } from 'next/server';
import { ResponseHandler } from '@/shared/utils/response-handler';

export function validateBody(schema: Record<string, { type: string; optional?: boolean }>) {
  return async (request: NextRequest) => {
    try {
      const body = await request.json();
      const errors: string[] = [];

      for (const [key, { type, optional }] of Object.entries(schema)) {
        if (body[key] === undefined && !optional) {
          errors.push(`${key} is required`);
        } else if (body[key] !== undefined && typeof body[key] !== type) {
          errors.push(`${key} must be a ${type}`);
        }
      }

      if (errors.length > 0) {
        return ResponseHandler.error('Validation failed', { errors }, 400);
      }

      (request as any).validatedBody = body;
      return null; // Proceed to the next handler
    } catch (error) {
      return ResponseHandler.error('Invalid JSON', undefined, 400);
    }
  };
} 