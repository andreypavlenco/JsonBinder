export class CreateProductsDto {
  categoryId: string;
  title: string;
  price: number;
  img: string[];
  brand: string;
  brandId: string;
  description: string[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  characteristics: string[]
}
