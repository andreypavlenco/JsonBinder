import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/modules/categories/repository/categories.repository';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { Categories } from '@prisma/client';
import { UpdateCategoriesDto } from './dto/update-categories-dto';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async createMany(dto: CreateCategoriesDto[]): Promise<Categories[]> {
    try {
      return await this.categoriesRepository.createMany(dto);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SAVE_CATEGORIES);
    }
  }

  async findAll(): Promise<Categories[]> {
    try {
      return await this.categoriesRepository.findAll();
    } catch (error) {
      throw new Error(ERROR_MESSAGES.RETRIEVE_CATEGORIES);
    }
  }

  async findId(id: string): Promise<Categories> {
    try {
      const category = await this.categoriesRepository.findById(id);
      if (!category) {
        throw new NotFoundException(
          ERROR_MESSAGES.CATEGORY_NOT_FOUND + `${id}`,
        );
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.RETRIEVE_CATEGORY);
    }
  }

  async delete(id: string): Promise<{ title: string }> {
    try {
      const category = await this.categoriesRepository.delete(id);
      if (!category) {
        throw new NotFoundException(
          ERROR_MESSAGES.CATEGORY_NOT_FOUND + `${id}`,
        );
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.DELETE_CATEGORY);
    }
  }

  async update(id: string, dto: UpdateCategoriesDto): Promise<Categories> {
    try {
      const category = await this.categoriesRepository.update(id, dto);
      if (!category) {
        throw new NotFoundException(
          ERROR_MESSAGES.CATEGORY_NOT_FOUND + `${id}`,
        );
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.UPDATE_CATEGORY);
    }
  }
}
