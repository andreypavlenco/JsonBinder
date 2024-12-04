import { Products } from '@prisma/client';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

export interface IProductsRepository {
  createMany(dto: CreateProductsDto[]): Promise<{ count: number }>;
  findAll(): Promise<Products[]>;
}
