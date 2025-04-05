import { NextRequest } from 'next/server';
import * as InventoryRouteHandler from '../../../../features/inventory/api/[id]/route';

export const GET = (request: NextRequest, context: { params: { id: string } }) => 
  InventoryRouteHandler.GET(request, context);

export const PUT = (request: NextRequest, context: { params: { id: string } }) => 
  InventoryRouteHandler.PUT(request, context);

export const DELETE = (request: NextRequest, context: { params: { id: string } }) => 
  InventoryRouteHandler.DELETE(request, context);