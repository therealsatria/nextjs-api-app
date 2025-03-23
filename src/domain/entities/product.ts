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
  
  export class Inventory {
    constructor(
      public id: string,
      public productId: string,
      public quantity: number,
      public updatedAt: Date
    ) {}
  }