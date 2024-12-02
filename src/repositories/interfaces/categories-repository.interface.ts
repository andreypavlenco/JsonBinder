import { Categories } from '@prisma/client';

export interface ICategoriesRepository {
  create(): Promise<Categories>;
  findAll(): Promise<Categories[]>;
}
