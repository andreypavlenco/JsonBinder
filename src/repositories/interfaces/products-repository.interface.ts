import { Products } from '@prisma/client';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

export interface IProductsRepository {
  createManyFromJson(dto: CreateProductsDto[]): Promise<Products[]>;
  findAll(): Promise<Products[]>;
  findOne(id: string): Promise<Products>;
  delete(id: string): Promise<{ title: string }>;
  update(id: string, dto: CreateProductsDto): Promise<Products>;
}
