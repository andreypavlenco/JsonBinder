import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProductService } from './utils/update-json.service';
import { ReadFileService } from '../json-read/json.read.service';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';
import { promises as fs } from 'fs-extra';
import { saveToFile } from './utils/save-to-file';
import { Brands, Categories } from '@prisma/client';

@Injectable()
export class WriteFileService {
  constructor(
    private readonly updateProductService: UpdateProductService,
    private readonly readFileService: ReadFileService,
  ) {}

  async saveUpdatedProducts(): Promise<void> {
    try {
      const products: CreateProductsDto[] =
        await this.readFileService.readFile();
      const updatedProducts =
        await this.updateProductService.updateProductsWithBrandsAndCategories(
          products,
        );

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
}
