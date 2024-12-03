import { BadRequestException, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
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

  async createCategoriesFromFile(filePath: string): Promise<void> {
    try {
      const products: Products[] =
        await this.fileReadService.readFile('./data/data.json');
      const uniqueBrands = extractUniqueCategories(products);
      await this.createManyFromList(uniqueBrands);
    } catch (error) {
      throw new BadRequestException('Error while creating categories', error);
    }
  }

  private async createManyFromList(
    categories: string[],
  ): Promise<{ count: number }> {
    try {
      const createCategoriesDto: CreateCategoriesDto[] = categories.map(
        (category) => ({
          name: category,
          createdAt: new Date(),
        }),
      );

      return await this.saveCategories(createCategoriesDto);
    } catch (error) {
      console.error('Error while parsing categories:', error);
      throw new BadRequestException('Failed to parse categories');
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
