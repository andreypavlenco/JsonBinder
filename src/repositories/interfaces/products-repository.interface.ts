import { Products } from '@prisma/client';

export interface IProductsRepository {
  createMany(dto: Products[]): Promise<{ count: number }>;
  // findById(id: number): Promise<Products | null>;
  // findAll(): Promise<Product[]>;
  // update(id: number, data: UpdateProductDto): Promise<Products>;
  // delete(id: number): Promise<void>;
}
