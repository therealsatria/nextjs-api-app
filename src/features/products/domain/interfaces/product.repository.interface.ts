import { Product } from '../entities/product';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { UpdateInventoryDto } from '@/features/inventory/domain/dtos/inventory.dto';
import { Inventory } from '@/features/inventory/domain/entities/inventory';

export interface IProductRepository {
  create(dto: CreateProductDto): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(id: string, dto: UpdateProductDto): Promise<Product>;
  updateInventory(id: string, dto: UpdateInventoryDto): Promise<Inventory>;
  delete(id: string): Promise<void>;
  bulkCreate(dtos: CreateProductDto[]): Promise<Product[]>;
  bulkDelete(ids: string[]): Promise<void>;
} 