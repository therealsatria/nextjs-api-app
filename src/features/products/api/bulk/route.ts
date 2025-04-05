import { NextRequest } from 'next/server';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductService } from '../../services/product.service';
import { CreateProductDto } from '../../domain/dtos/product.dto';
import { validateBody } from '@/shared/middleware/validation';
import { ResponseHandler } from '@/shared/utils/response-handler';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const bulkCreateSchema = {
  products: { type: 'object' },
};

const bulkDeleteSchema = {
  ids: { type: 'object' },
};

export async function POST(request: NextRequest) {
  const validation = await validateBody(bulkCreateSchema)(request);
  if (validation) return validation;

  try {
    const body = (request as any).validatedBody;
    const dtos = body.products.map((p: any) => new CreateProductDto(p.name, p.description, p.price, p.initialQuantity));
    const products = await productService.bulkCreateProducts(dtos);
    return ResponseHandler.created(products, 'Products created successfully');
  } catch (error) {
    return ResponseHandler.error(error);
  }
}

export async function DELETE(request: NextRequest) {
  const validation = await validateBody(bulkDeleteSchema)(request);
  if (validation) return validation;

  try {
    const body = (request as any).validatedBody;
    await productService.bulkDeleteProducts(body.ids);
    return ResponseHandler.noContent('Products deleted successfully');
  } catch (error) {
    return ResponseHandler.error(error);
  }
} 