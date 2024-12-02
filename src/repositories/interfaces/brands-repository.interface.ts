import { Brands } from '@prisma/client';

export interface IBrandsRepository {
  create(): Promise<Brands>;
  findAll(): Promise<Brands[]>;
}
