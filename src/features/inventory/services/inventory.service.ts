import { IInventoryRepository } from '../domain/interfaces/inventory.repository.interface';
import { CreateInventoryDto, UpdateInventoryDto } from '../domain/dtos/inventory.dto';
import { Inventory } from '../domain/entities/inventory';

export class InventoryService {
  constructor(private inventoryRepository: IInventoryRepository) {}

  async createInventory(dto: CreateInventoryDto): Promise<Inventory> {
    if (dto.quantity < 0) throw new Error('Quantity cannot be negative');
    return this.inventoryRepository.create(dto);
  }

  async getInventoryById(id: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) throw new Error('Inventory not found');
    return inventory;
  }

  async getInventoryByProductId(productId: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findByProductId(productId);
    if (!inventory) throw new Error('Inventory not found for this product');
    return inventory;
  }

  async getAllInventories(): Promise<Inventory[]> {
    return this.inventoryRepository.findAll();
  }

  async updateInventory(id: string, dto: UpdateInventoryDto): Promise<Inventory> {
    if (dto.quantity !== undefined && dto.quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    const inventory = await this.inventoryRepository.update(id, dto);
    if (!inventory) throw new Error('Inventory not found');
    return inventory;
  }

  async deleteInventory(id: string): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
} 