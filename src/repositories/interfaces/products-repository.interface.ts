import { Products } from '@prisma/client';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

export interface IProductsRepository {
  createMany(dto: CreateProductsDto[]): Promise<{ count: number }>;
  // findById(id: number): Promise<Products | null>;
  // findAll(): Promise<Product[]>;
  // update(id: number, data: UpdateProductDto): Promise<Products>;
  // delete(id: number): Promise<void>;
}
