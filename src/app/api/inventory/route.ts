import { NextRequest } from 'next/server';
import * as InventoryRouteHandler from '../../../features/inventory/api/route';

export const POST = (request: NextRequest) => 
  InventoryRouteHandler.POST(request);

export const GET = () => 
  InventoryRouteHandler.GET();