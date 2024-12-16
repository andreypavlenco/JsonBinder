import { Products } from '@prisma/client';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

export interface IProductsRepository {
  createManyFromJson(dto: CreateProductsDto[]): Promise<Products[]>;
  findAll(): Promise<Products[]>;
}
