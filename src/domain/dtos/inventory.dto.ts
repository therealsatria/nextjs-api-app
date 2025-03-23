export class CreateInventoryDto {
    constructor(
      public productId: string,
      public quantity: number
    ) {}
  }
  
  export class UpdateInventoryDto {
    constructor(
      public quantity?: number
    ) {}
  }