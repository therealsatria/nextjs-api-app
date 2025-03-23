import { NextRequest } from 'next/server';
import { InventoryRepository } from '@/infrastructure/repositories/inventory.repository';
import { InventoryService } from '@/services/inventory.service';
import { UpdateInventoryDto } from '@/domain/dtos/inventory.dto';
import { validateBody } from '@/middleware/validation';
import { ResponseHandler } from '@/utils/response-handler';

const inventoryRepository = new InventoryRepository();
const inventoryService = new InventoryService(inventoryRepository);

const updateSchema = {
  quantity: { type: 'number', optional: true },
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const inventory = await inventoryService.getInventoryById(params.id);
    return ResponseHandler.success(inventory);
  } catch (error) {
    return ResponseHandler.error(error, undefined, 404);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const validation = await validateBody(updateSchema)(request);
  if (validation) return validation;

  try {
    const body = (request as any).validatedBody;
    const dto = new UpdateInventoryDto(body.quantity);
    const inventory = await inventoryService.updateInventory(params.id, dto);
    return ResponseHandler.success(inventory, 'Inventory updated successfully');
  } catch (error) {
    return ResponseHandler.error(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await inventoryService.deleteInventory(params.id);
    return ResponseHandler.noContent();
  } catch (error) {
    return ResponseHandler.error(error);
  }
}