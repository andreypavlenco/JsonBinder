import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/repositories/repository/categories.repository';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { extractUniqueCategories } from './utils/extract-categories';
import { ReadFileService } from 'src/json-file-service/json-read/json.read.service';
import { Categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly fileReadService: ReadFileService,
  ) {}

  async createCategoriesFromFile(): Promise<Categories[]> {
    try {
      const products = await this.fileReadService.readFile();
      const categoryNames = extractUniqueCategories(products);
      return await this.addUniqueCategories(categoryNames);
    } catch (error) {
      throw new BadRequestException(
        'Failed to create categories from file',
        error,
      );
    }
  }

  private async addUniqueCategories(
    categoryNames: string[],
  ): Promise<Categories[]> {
    const categoriesDto = this.mapToCategoryDtos(categoryNames);
    const existingCategories = await this.findAllCategories();

    const newCategories = this.filterUniqueCategories(
      existingCategories,
      categoriesDto,
    );

    if (newCategories.length > 0) {
      return await this.saveCategories(newCategories);
    } else {
      return;
    }
  }

  private mapToCategoryDtos(categoryNames: string[]): CreateCategoriesDto[] {
    return categoryNames.map((name) => ({
      name,
      createdAt: new Date(),
    }));
  }

  private filterUniqueCategories(
    existingCategories: CreateCategoriesDto[],
    newCategories: CreateCategoriesDto[],
  ): CreateCategoriesDto[] {
    return newCategories.filter(
      (newCategory) =>
        !existingCategories.some(
          (existingCategory) => existingCategory.name === newCategory.name,
        ),
    );
  }

  private async saveCategories(
    categories: CreateCategoriesDto[],
  ): Promise<Categories[]> {
    try {
      return await this.categoriesRepository.createManyFromJson(categories);
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
