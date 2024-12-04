import { Categories } from '@prisma/client';
import { CreateCategoriesDto } from 'src/categories/dto/create-categories-dto';

export interface ICategoriesRepository {
  createMany(dto: CreateCategoriesDto[]): Promise<{ count: number }>;
  findAll(): Promise<Categories[]>;
}
