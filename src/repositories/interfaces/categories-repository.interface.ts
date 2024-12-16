import { Categories } from '@prisma/client';
import { CreateCategoriesDto } from 'src/categories/dto/create-categories-dto';

export interface ICategoriesRepository {
  createManyFromJson(dto: CreateCategoriesDto[]): Promise<Categories[]>;
  findAll(): Promise<Categories[]>;
}
