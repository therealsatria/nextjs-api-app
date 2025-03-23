export class CreateProductDto {
    constructor(
      public name: string,
      public description: string | null,
      public price: number,
      public initialQuantity: number
    ) {}
  }
  
  export class UpdateProductDto {
    constructor(
      public name?: string,
      public description?: string | null,
      public price?: number
    ) {}
  }