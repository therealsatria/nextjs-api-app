import { Inventory } from '../entities/inventory';
import { CreateInventoryDto, UpdateInventoryDto } from '../dtos/inventory.dto';

export interface IInventoryRepository {
  create(dto: CreateInventoryDto): Promise<Inventory>;
  findById(id: string): Promise<Inventory | null>;
  findByProductId(productId: string): Promise<Inventory | null>;
  findAll(): Promise<Inventory[]>;
  update(id: string, dto: UpdateInventoryDto): Promise<Inventory>;
  delete(id: string): Promise<void>;
} 