import { Product, Inventory } from '@/domain/entities/product';
import { CreateProductDto, UpdateProductDto } from '@/domain/dtos/product.dto';
import { CreateInventoryDto, UpdateInventoryDto } from '@/domain/dtos/inventory.dto';

export interface IProductRepository {
  create(product: CreateProductDto): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(id: string, product: UpdateProductDto): Promise<Product>;
  updateInventory(id: string, inventory: UpdateInventoryDto): Promise<Inventory>;
  delete(id: string): Promise<void>;
  bulkCreate(products: CreateProductDto[]): Promise<Product[]>;
  bulkDelete(ids: string[]): Promise<void>;
}

export interface IInventoryRepository {
  create(inventory: CreateInventoryDto): Promise<Inventory>;
  findById(id: string): Promise<Inventory | null>;
  findByProductId(productId: string): Promise<Inventory | null>;
  findAll(): Promise<Inventory[]>;
  update(id: string, inventory: UpdateInventoryDto): Promise<Inventory>;
  delete(id: string): Promise<void>;
}