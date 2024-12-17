import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/repositories/repository/categories.repository';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { Categories } from '@prisma/client';
import { UpdateCategoriesDto } from './dto/update-categories-dto';

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

  async findAll(): Promise<Categories[]> {
    try {
      return await this.categoriesRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to fetch categories', error);
    }
  }

  async findId(id: string): Promise<Categories> {
    try {
      return await this.categoriesRepository.findOne(id);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }

  async delete(id: string): Promise<{ name: string }> {
    try {
      return await this.categoriesRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }

  async update(id: string, dto: UpdateCategoriesDto): Promise<Categories> {
    try {
      return await this.categoriesRepository.update(id, dto);
    } catch (error) {
      throw new BadRequestException('Error fetching products', error);
    }
  }
}
