import { BadRequestException, Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { CategoriesService } from '../categories.service';
import { ReadFileService } from 'src/json-file-service/json-read/json.read.service';
import { WriteFileService } from 'src/json-file-service/json-write/json.write.service';
import { extractUniqueCategories } from './utils/extract-categories';
import { CreateCategoriesDto } from '../dto/create-categories-dto';

@Injectable()
export class CategoriesImportFromJsonService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly fileReadService: ReadFileService,
    private readonly writingFileService: WriteFileService,
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
    const existingCategories = await this.categoriesService.findAll();

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

  private async saveCategoriesToJsonFile(categories: Categories[]) {
    try {
      return await this.writingFileService.saveCategoriesToFile(categories);
    } catch (error) {
      throw new BadRequestException('Error saving brands', error);
    }
  }

  private async saveCategories(
    categories: CreateCategoriesDto[],
  ): Promise<Categories[]> {
    try {
      const saveCategories =
        await this.categoriesService.saveCategoriesFromJson(categories);
      await this.saveCategoriesToJsonFile(saveCategories);
      return saveCategories;
    } catch (error) {
      throw new BadRequestException('Failed to save categories', error);
    }
  }
}
