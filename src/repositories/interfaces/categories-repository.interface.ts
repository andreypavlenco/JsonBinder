import { Categories } from '@prisma/client';
import { CreateCategoriesDto } from 'src/categories/dto/create-categories-dto';
import { UpdateCategoriesDto } from 'src/categories/dto/update-categories-dto';

export interface ICategoriesRepository {
  createManyFromJson(dto: CreateCategoriesDto[]): Promise<Categories[]>;
  findAll(): Promise<Categories[]>;
  findOne(id: string): Promise<Categories>;
  delete(id: string): Promise<{ name: string }>;
  update(id: string, dto: UpdateCategoriesDto): Promise<Categories>;
}
