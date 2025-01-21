import { Inject, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/modules/categories/repository/categories.repository';
import { Categories } from '@prisma/client';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import NotFoundError from 'src/common/exceptions/not-found.exception';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto';
import { CATEGORIES_REPOSITORY_TOKEN } from 'src/common/constants/repository-token';
import { handleHttpException } from 'src/common/exceptions/handle-http.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY_TOKEN)
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

  async findById(id: string): Promise<Categories> {
    try {
      const category = await this.categoriesRepository.findById(id);
      if (!category) {
        throw new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND, id);
      }
      return category;
    } catch (error) {
      handleHttpException(error, ERROR_MESSAGES.RETRIEVE_CATEGORY);
    }
  }

  async delete(id: string): Promise<{ title: string }> {
    try {
      const category = await this.categoriesRepository.delete(id);
      if (!category) {
        throw new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND, id);
      }
      return category;
    } catch (error) {
      handleHttpException(error, ERROR_MESSAGES.DELETE_CATEGORY);
    }
  }

  async update(id: string, dto: UpdateCategoriesDto): Promise<Categories> {
    try {
      const category = await this.categoriesRepository.update(id, dto);
      if (!category) {
        throw new NotFoundError(ERROR_MESSAGES.CATEGORY_NOT_FOUND, id);
      }
      return category;
    } catch (error) {
      handleHttpException(error, ERROR_MESSAGES.UPDATE_CATEGORY);
    }
  }
}
