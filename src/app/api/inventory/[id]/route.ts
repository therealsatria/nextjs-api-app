import { NextRequest } from 'next/server';
import * as InventoryRouteHandler from '../../../../features/inventory/api/[id]/route';

export const GET = (request: NextRequest, params: { params: { id: string } }) => 
  InventoryRouteHandler.GET(request, params);

export const PUT = (request: NextRequest, params: { params: { id: string } }) => 
  InventoryRouteHandler.PUT(request, params);

export const DELETE = (request: NextRequest, params: { params: { id: string } }) => 
  InventoryRouteHandler.DELETE(request, params);