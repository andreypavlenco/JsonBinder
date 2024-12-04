import { BadRequestException, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { CategoriesRepository } from 'src/repositories/repository/categories.repository';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { extractUniqueCategories } from './utils/extract-categories';
import { ReadFileService } from 'src/fs-module/fs.read/fs.read.service';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly fileReadService: ReadFileService,
  ) {}

  async createCategoriesFromFile(): Promise<void> {
    try {
      const products: CreateProductsDto[] =
        await this.fileReadService.readFile();
      const uniqueCategory = extractUniqueCategories(products);
      await this.createManyFromList(uniqueCategory);
    } catch (error) {
      throw new BadRequestException('Error while creating categories', error);
    }
  }

  private async createManyFromList(
    categories: string[],
  ): Promise<{ count: number } | true> {
    try {
      const uniqueCategory: CreateCategoriesDto[] = categories.map(
        (category) => ({
          name: category,
          createdAt: new Date(),
        }),
      );

      return await this.checkAndAddUniquecategories(uniqueCategory);
    } catch (error) {
      console.error('Error while parsing categories:', error);
      throw new BadRequestException('Failed to parse categories');
    }
  }

  private async checkAndAddUniquecategories(categories: CreateCategoriesDto[]) {
    try {
      const existingCategories = await this.findAll();

      const uniqueCategories = categories.filter((category) => {
        return !existingCategories.some(
          (existingCategories) => existingCategories.name === category.name,
        );
      });

      if (uniqueCategories.length > 0) {
        return await this.saveCategories(uniqueCategories);
      } else {
        return true;
      }
    } catch (error) {
      throw new BadRequestException('Error creating many brands', error);
    }
  }

  private async saveCategories(
    categories: CreateCategoriesDto[],
  ): Promise<{ count: number }> {
    try {
      return await this.categoriesRepository.createMany(categories);
    } catch (error) {
      console.error('Error while saving categories:', error);
      throw new BadRequestException('Failed to save categories');
    }
  }

  async findAll() {
    try {
      return await this.categoriesRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to fetch categories', error);
    }
  }
}
