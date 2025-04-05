export class Inventory {
  constructor(
    public id: string,
    public productId: string,
    public quantity: number,
    public updatedAt: Date
  ) {}
} 