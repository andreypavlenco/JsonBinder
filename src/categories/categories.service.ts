import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/repositories/repository/categories.repository';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { Categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async saveCategoriesFromJson(
    categories: CreateCategoriesDto[],
  ): Promise<Categories[]> {
    try {
      const saveCategories =
        await this.categoriesRepository.createManyFromJson(categories);
      return saveCategories;
    } catch (error) {
      throw new BadRequestException('Failed to save categories', error);
    }
  }

  async findAllCategories(): Promise<Categories[]> {
    try {
      return await this.categoriesRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to fetch categories', error);
    }
  }
}
