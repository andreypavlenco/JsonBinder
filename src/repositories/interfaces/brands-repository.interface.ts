import { Brands } from '@prisma/client';

export interface IBrandsRepository {
  createMany(dto: Brands[]): Promise<{ count: number }>;
  findAll(): Promise<Brands[]>;
}
