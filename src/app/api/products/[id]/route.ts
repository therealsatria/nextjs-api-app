import { NextRequest } from 'next/server';
import * as ProductRouteHandler from '../../../../features/products/api/[id]/route';

export const GET = (request: NextRequest, params: { params: { id: string } }) => 
  ProductRouteHandler.GET(request, params);

export const PUT = (request: NextRequest, params: { params: { id: string } }) => 
  ProductRouteHandler.PUT(request, params);

export const PATCH = (request: NextRequest, params: { params: { id: string } }) => 
  ProductRouteHandler.PATCH(request, params);

export const DELETE = (request: NextRequest, params: { params: { id: string } }) => 
  ProductRouteHandler.DELETE(request, params);