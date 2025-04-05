import { NextRequest } from 'next/server';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductService } from '../../services/product.service';
import { UpdateProductDto } from '../../domain/dtos/product.dto';
import { UpdateInventoryDto } from '@/features/inventory/domain/dtos/inventory.dto';
import { validateBody } from '@/shared/middleware/validation';
import { ResponseHandler } from '@/shared/utils/response-handler';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const updateProductSchema = {
  name: { type: 'string', optional: true },
  description: { type: 'string', optional: true },
  price: { type: 'number', optional: true },
};

const updateInventorySchema = {
  quantity: { type: 'number' },
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await productService.getProduct(params.id);
    return ResponseHandler.success(product);
  } catch (error) {
    return ResponseHandler.error(error, undefined, 404);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const validation = await validateBody(updateProductSchema)(request);
  if (validation) return validation;

  try {
    const body = (request as any).validatedBody;
    const dto = new UpdateProductDto(body.name, body.description, body.price);
    const product = await productService.updateProduct(params.id, dto);
    return ResponseHandler.success(product, 'Product updated successfully');
  } catch (error) {
    return ResponseHandler.error(error);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const validation = await validateBody(updateInventorySchema)(request);
  if (validation) return validation;

  try {
    const body = (request as any).validatedBody;
    const dto = new UpdateInventoryDto(body.quantity);
    const inventory = await productService.updateInventory(params.id, dto);
    return ResponseHandler.success(inventory, 'Inventory updated successfully');
  } catch (error) {
    return ResponseHandler.error(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await productService.deleteProduct(params.id);
    return ResponseHandler.noContent();
  } catch (error) {
    return ResponseHandler.error(error);
  }
} 