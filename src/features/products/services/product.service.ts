import { IProductRepository } from '../domain/interfaces/product.repository.interface';
import { CreateProductDto, UpdateProductDto } from '../domain/dtos/product.dto';
import { UpdateInventoryDto } from '@/features/inventory/domain/dtos/inventory.dto';
import { Product } from '../domain/entities/product';
import { Inventory } from '@/features/inventory/domain/entities/inventory';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    if (dto.price < 0 || dto.initialQuantity < 0) {
      throw new Error('Price and quantity must be non-negative');
    }
    return this.productRepository.create(dto);
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.update(id, dto);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async updateInventory(id: string, dto: UpdateInventoryDto): Promise<Inventory> {
    if (dto.quantity! < 0) throw new Error('Quantity cannot be negative');
    const inventory = await this.productRepository.updateInventory(id, dto);
    if (!inventory) throw new Error('Inventory not found');
    return inventory;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async bulkCreateProducts(dtos: CreateProductDto[]): Promise<Product[]> {
    for (const dto of dtos) {
      if (dto.price < 0 || dto.initialQuantity < 0) {
        throw new Error('Price and quantity must be non-negative');
      }
    }
    return this.productRepository.bulkCreate(dtos);
  }

  async bulkDeleteProducts(ids: string[]): Promise<void> {
    if (ids.length === 0) throw new Error('No IDs provided for deletion');
    await this.productRepository.bulkDelete(ids);
  }
} 