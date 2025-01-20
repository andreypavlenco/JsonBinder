import { BadRequestException, Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { CategoriesService } from '../../modules/categories/categories.service';
import { extractUniqueCategories } from './utils/extract-categories';
import { CreateCategoriesDto } from '../../modules/categories/dto/create-categories-dto';
import { ReadJsonService } from 'src/json-utils/json.read.service';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { WriteJsonService } from 'src/json-utils/json.write.service';
import { checkUnique } from 'src/common/utils';

@Injectable()
export class CategoriesImportFromJsonService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly readJsonService: ReadJsonService,
    private readonly writeJsonService: WriteJsonService,
  ) {}

  async importUniqueCategories(): Promise<Categories[]> {
    const [products, existCategories] = await Promise.all([
      this.readJsonService.readJson(),
      this.categoriesService.findAll(),
    ]);
    const categoryNames = extractUniqueCategories(products);
    const uniqueCategories = checkUnique<Categories, CreateCategoriesDto>(
      existCategories,
      categoryNames,
    );
    if (uniqueCategories.length === 0) {
      throw new BadRequestException(ERROR_MESSAGES.NO_NEW_CATEGORIES);
    }
    return this.createCategories(uniqueCategories);
  }

  private async createCategories(
    categories: CreateCategoriesDto[],
  ): Promise<Categories[]> {
    const category = await this.categoriesService.createMany(categories);
    await this.writeJsonService.writeCategoriesToJson(category);
    return category;
  }
}
