import { BadRequestException, Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { UpdateProductService } from './update-products.service';
import { ReadFileService } from '../fs.read/fs.read.service';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';
import { Brands } from '@prisma/client';

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

      await writeFile(
        'src/fs-module/fs.read/new.json',
        JSON.stringify(updatedProducts, null, 2),
      );
    } catch (error) {
      throw new BadRequestException('Error saving updated products', error);
    }
  }

  async saveToFile(filePath: string, data: unknown): Promise<void> {
    try {
      await writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new BadRequestException(`Error saving data to ${filePath}`, error);
    }
  }
}
