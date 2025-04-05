import { NextRequest } from 'next/server';
import * as ProductRouteHandler from '../../../../features/products/api/[id]/route';

export const GET = (request: NextRequest, context: { params: { id: string } }) => 
  ProductRouteHandler.GET(request, context);

export const PUT = (request: NextRequest, context: { params: { id: string } }) => 
  ProductRouteHandler.PUT(request, context);

export const PATCH = (request: NextRequest, context: { params: { id: string } }) => 
  ProductRouteHandler.PATCH(request, context);

export const DELETE = (request: NextRequest, context: { params: { id: string } }) => 
  ProductRouteHandler.DELETE(request, context);