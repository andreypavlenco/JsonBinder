import { Products } from '@prisma/client';

export interface IProductRepository {
  create(): Promise<Products>;
  // findById(id: number): Promise<Products | null>;
  // findAll(): Promise<Product[]>;
  // update(id: number, data: UpdateProductDto): Promise<Products>;
  // delete(id: number): Promise<void>;
}
