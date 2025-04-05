import { Inventory } from '@/features/inventory/domain/entities/inventory';

export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public price: number,
    public createdAt: Date,
    public inventory?: Inventory
  ) {}
} 