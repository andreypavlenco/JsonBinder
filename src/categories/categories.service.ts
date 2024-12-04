import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/repositories/repository/categories.repository';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { extractUniqueCategories } from './utils/extract-categories';
import { ReadFileService } from 'src/fs-module/fs.read/fs.read.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly fileReadService: ReadFileService,
  ) {}

  async createCategoriesFromFile(): Promise<{ count: number }> {
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
  ): Promise<{ count: number }> {
    const categoriesDto = this.mapToCategoryDtos(categoryNames);
    const existingCategories = await this.getAllCategories();

    const newCategories = this.filterUniqueCategories(
      existingCategories,
      categoriesDto,
    );

    if (newCategories.length > 0) {
      return await this.saveCategories(newCategories);
    } else {
      return { count: 0 };
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
  ): Promise<{ count: number }> {
    try {
      return await this.categoriesRepository.createMany(categories);
    } catch (error) {
      throw new BadRequestException('Failed to save categories', error);
    }
  }

  private async getAllCategories(): Promise<CreateCategoriesDto[]> {
    try {
      return await this.categoriesRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to fetch categories', error);
    }
  }
}
