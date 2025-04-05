import { NextRequest } from 'next/server';
import * as DbTestRouteHandler from '../../../features/db-test/api/route';

export const GET = (request: NextRequest) => 
  DbTestRouteHandler.GET(request);