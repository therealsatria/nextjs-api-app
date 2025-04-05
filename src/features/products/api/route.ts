import { NextRequest } from 'next/server';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../domain/dtos/product.dto';
import { validateBody } from '@/shared/middleware/validation';
import { ResponseHandler } from '@/shared/utils/response-handler';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const createSchema = {
  name: { type: 'string' },
  description: { type: 'string', optional: true },
  price: { type: 'number' },
  initialQuantity: { type: 'number' },
};

export async function POST(request: NextRequest) {
  const validation = await validateBody(createSchema)(request);
  if (validation) return validation;

  try {
    const body = (request as any).validatedBody;
    const dto = new CreateProductDto(body.name, body.description, body.price, body.initialQuantity);
    const product = await productService.createProduct(dto);
    return ResponseHandler.created(product);
  } catch (error) {
    return ResponseHandler.error(error);
  }
}

export async function GET() {
  try {
    const products = await productRepository.findAll();
    return ResponseHandler.success(products);
  } catch (error) {
    return ResponseHandler.error(error);
  }
} 