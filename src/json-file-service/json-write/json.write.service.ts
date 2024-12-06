import { BadRequestException, Injectable } from '@nestjs/common';
import { ReadFileService } from '../json-read/json.read.service';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';
import { promises as fs } from 'fs-extra';
import { saveToFile } from './utils/save-to-file';
import { Brands, Categories } from '@prisma/client';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class WriteFileService {
  constructor(
    private readonly readFileService: ReadFileService,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async saveUpdatedProducts(): Promise<void> {
    try {
      const products: CreateProductsDto[] =
        await this.readFileService.readFile();
      const updatedProducts =
        await this.updateProductsWithBrandsAndCategories(products);

      await fs.writeJson(
        'unloadding_files/products.json',
        JSON.stringify(updatedProducts, null, 2),
      );
    } catch (error) {
      throw new BadRequestException('Error saving updated products', error);
    }
  }

  async saveBrandsToFile(brands: Brands[]): Promise<void> {
    try {
      return await saveToFile('unloadding_files/brands.json', brands);
    } catch (error) {
      throw new BadRequestException('Error saving file brands', error);
    }
  }

  async saveCategoriesToFile(categories: Categories[]): Promise<void> {
    try {
      return await saveToFile('unloadding_files/categories.json', categories);
    } catch (error) {
      throw new BadRequestException('Error saving file brands', error);
    }
  }

  private async updateProductsWithBrandsAndCategories(
    products: CreateProductsDto[],
  ): Promise<CreateProductsDto[]> {
    const brands = await this.brandsService.findAllBrands();
    const categories = await this.categoriesService.findAllCategories();

    const updatedProducts = products.map((product) => {
      const brand = brands.find((b) => b.name === product.brand);
      const productFirstWord = product.title.split(' ')[0];
      const category = categories.find(
        (c) => c.name.split(' ')[0] === productFirstWord,
      );
      return {
        ...product,
        brandId: brand.id,
        categoryId: category.id,
      };
    });
    return updatedProducts;
  }
}
