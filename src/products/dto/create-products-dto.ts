export class CreateProductsDto {
  categoryId: string;
  title: string;
  price: number;
  img: string[];
  // brand:
  brandId: string;
  description: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}