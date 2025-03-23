import { NextRequest } from 'next/server';
import { InventoryRepository } from '@/infrastructure/repositories/inventory.repository';
import { InventoryService } from '@/services/inventory.service';
import { CreateInventoryDto } from '@/domain/dtos/inventory.dto';
import { validateBody } from '@/middleware/validation';
import { ResponseHandler } from '@/utils/response-handler';

const inventoryRepository = new InventoryRepository();
const inventoryService = new InventoryService(inventoryRepository);

const createSchema = {
  productId: { type: 'string' },
  quantity: { type: 'number' },
};

export async function POST(request: NextRequest) {
  const validation = await validateBody(createSchema)(request);
  if (validation) return validation;

  try {
    const body = (request as any).validatedBody;
    const dto = new CreateInventoryDto(body.productId, body.quantity);
    const inventory = await inventoryService.createInventory(dto);
    return ResponseHandler.created(inventory);
  } catch (error) {
    return ResponseHandler.error(error);
  }
}

export async function GET() {
  try {
    const inventories = await inventoryService.getAllInventories();
    return ResponseHandler.success(inventories);
  } catch (error) {
    return ResponseHandler.error(error);
  }
}