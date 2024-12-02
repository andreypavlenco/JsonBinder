import { Categories } from '@prisma/client';

export interface ICategoriesRepository {
  create(dto: Categories[]): Promise<{ count: number }>;
  findAll(): Promise<Categories[]>;
}
