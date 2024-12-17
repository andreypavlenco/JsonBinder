import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/repositories/repository/categories.repository';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { Categories } from '@prisma/client';
import { UpdateCategoriesDto } from './dto/update-categories-dto';
import { ErrorHandlerService } from 'src/common/error-handler/error-handler.service';
import { ERROR_MESSAGES } from 'src/common/ constants/error-messages';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async saveCategoriesFromJson(
    categories: CreateCategoriesDto[],
  ): Promise<Categories[]> {
    try {
      return await this.categoriesRepository.createManyFromJson(categories);
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.SAVE_CATEGORIES,
      );
    }
  }

  async findAll(): Promise<Categories[]> {
    try {
      return await this.categoriesRepository.findAll();
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.RETRIEVE_CATEGORIES,
      );
    }
  }

  async findId(id: string): Promise<Categories> {
    try {
      const category = await this.categoriesRepository.findOne(id);
      if (!category) {
        this.errorHandler.handleNotFound('Category', `with ID ${id}`);
      }
      return category;
    } catch (error) {
      this.errorHandler.handleInternalServerError(
        error,
        ERROR_MESSAGES.RETRIEVE_CATEGORY,
      );
    }
  }

  async delete(id: string): Promise<{ name: string }> {
    try {
      const deletedCategory = await this.categoriesRepository.delete(id);
      if (!deletedCategory) {
        this.errorHandler.handleNotFound('Category', `with ID ${id}`);
      }
      return deletedCategory;
    } catch (error) {
      this.errorHandler.handleBadRequest(error, ERROR_MESSAGES.DELETE_CATEGORY);
    }
  }

  async update(id: string, dto: UpdateCategoriesDto): Promise<Categories> {
    try {
      const updatedCategory = await this.categoriesRepository.update(id, dto);
      if (!updatedCategory) {
        this.errorHandler.handleNotFound('Category', `with ID ${id}`);
      }
      return updatedCategory;
    } catch (error) {
      this.errorHandler.handleBadRequest(error, ERROR_MESSAGES.UPDATE_CATEGORY);
    }
  }
}
