import { BadRequestException, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { BrandsCreateService } from 'src/brands-create-data/brands-create.service';
import { CategoriesCreateService } from 'src/categories-create-data/categories-create.service';
import { FileReadService } from 'src/fs/fs.read/fs.read.service';
import { writeFile, mkdir } from 'fs/promises';
@Injectable()
export class WriteFileService {
  constructor(
    private readonly brandsCreateSercie: BrandsCreateService,
    private readonly categotiesCreateSercie: CategoriesCreateService,
    private readonly readFile: FileReadService,
  ) {}

  async findAll() {
    try {
      const brands = await this.brandsCreateSercie.findAll();
      const categories = await this.categotiesCreateSercie.findAll();
      const products: Products[] = await this.readFile.readData(
        './data/products.json',
      );

      const updatedBrandsProducts = products.map((product) => {
        const brand = brands.find((brand) => brand.name === product.brand);
        if (brand) {
          product.brandId = brand.id;
        }
        return product;
      });

      const updatedCategoriesProducts = updatedBrandsProducts.map((product) => {
        const productFirstWord = product.title.split(' ')[0];

        const category = categories.find(
          (category) => category.name.split(' ')[0] === productFirstWord,
        );

        if (category) {
          product.categoryId = category.id;
        }

        return product;
      });

      const data = await writeFile(
        './data/products.json',
        JSON.stringify(updatedCategoriesProducts, null, 2),
      );

      return [brands, categories, updatedBrandsProducts];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
