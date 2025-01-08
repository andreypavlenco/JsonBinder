import { BadRequestException, Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { CategoriesService } from '../../modules/categories/categories.service';
import { extractUniqueCategories } from './utils/extract-categories';
import { CreateCategoriesDto } from '../../modules/categories/dto/create-categories-dto';
import { ReadJsonService } from 'src/json-utils/json.read.service';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { WriteJsonService } from 'src/json-utils/json.write.service';
import { checkUnique } from 'src/common/utils/check-unique';

@Injectable()
export class CategoriesImportFromJsonService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly readJsonService: ReadJsonService,
    private readonly writeJsonService: WriteJsonService,
  ) {}

  async importUniqueCategories(): Promise<Categories[]> {
    try {
      const products = await this.readJsonService.readJson();
      const categoryNames = extractUniqueCategories(products);
      const existCategories = await this.categoriesService.findAll();
      const uniqueCategories = checkUnique<Categories, CreateCategoriesDto>(
        existCategories,
        categoryNames,
      );
      if (uniqueCategories.length === 0) {
        throw new BadRequestException(ERROR_MESSAGES.NO_NEW_CATEGORIES);
      }
      return this.createCategories(uniqueCategories);
    } catch (error) {
      throw error;
    }
  }

  private async createCategories(
    categories: CreateCategoriesDto[],
  ): Promise<Categories[]> {
    try {
      const category = await this.categoriesService.createMany(categories);
      this.writeJsonService.writeCategoriesToJson(category);
      return category;
    } catch (error) {
      throw error;
    }
  }
}
