import { NextRequest } from 'next/server';
import * as ProductRouteHandler from '../../../../features/products/api/bulk/route';

export const POST = (request: NextRequest) => 
  ProductRouteHandler.POST(request);

export const DELETE = (request: NextRequest) => 
  ProductRouteHandler.DELETE(request);