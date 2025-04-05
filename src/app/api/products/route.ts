import { NextRequest } from 'next/server';
import * as ProductRouteHandler from '../../../features/products/api/route';

export const POST = (request: NextRequest) => 
  ProductRouteHandler.POST(request);

export const GET = () => 
  ProductRouteHandler.GET();