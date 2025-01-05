import { BadRequestException, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { ReadFileService } from 'src/json-file-service/json-read/json.read.service';
import { ProductsService } from '../products.service';
import { CreateProductsDto } from '../dto/create-products-dto';
import { WriteFileService } from 'src/json-file-service/json-write/json.write.service';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsImportfromJsonService {
  constructor(
    private readonly readFileService: ReadFileService,
    private readonly productsService: ProductsService,
    private readonly writeFileService: WriteFileService,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createProductsFromFile(): Promise<Products[]> {
    try {
      const dbProducts = await this.productsService.findAll();
      const inputProducts = await this.loadProducts();
      return await this.filterAndSaveUniqueProducts(dbProducts, inputProducts);
    } catch (error) {
      throw new BadRequestException('Error processing products', error);
    }
  }

  private async loadProducts(): Promise<CreateProductsDto[]> {
    try {
      return await this.readFileService.readFile();
    } catch (error) {
      throw new BadRequestException('Error reading products from file', error);
    }
  }

  private async filterAndSaveUniqueProducts(
    dbProducts: Products[],
    inputProducts: CreateProductsDto[],
  ): Promise<Products[]> {
    const newProducts = inputProducts.filter((product) => {
      return !dbProducts.some((dbProduct) => dbProduct.title === product.title);
    });

    if (newProducts.length > 0) {
      return await this.saveProductsWithBrandsAndCategoriesJson(newProducts);
    }
    return;
  }

  private async saveProductsWithBrandsAndCategoriesJson(
    products: CreateProductsDto[],
  ): Promise<Products[]> {
    const brands = await this.brandsService.findAll();
    const categories = await this.categoriesService.findAll();

    const productsWithIds = products.map((product) => {
      if (!product.brand) {
        throw new BadRequestException(
          `Brand is missing for product: ${product.title}`,
        );
      }
      const brand = brands.find((b) => b.title === product.brand);
      if (!brand) {
        throw new BadRequestException(`Brand not found for ${product.brand}`);
      }

      const productFirstWord = product.title.split(' ')[0];
      const category = categories.find(
        (c) => c.title.split(' ')[0] === productFirstWord,
      );
      if (!category) {
        throw new BadRequestException(
          `Category not found for  ${product.title}`,
        );
      }

      return {
        ...product,
        brandId: brand.id,
        categoryId: category.id,
      };
    });

    return await this.saveProducts(productsWithIds);
  }

  private async saveProducts(
    products: CreateProductsDto[],
  ): Promise<Products[]> {
    try {
      const saveProducts: Products[] =
        await this.productsService.saveProductsFromJson(products);
      await this.writeFileService.saveProductsToFile(saveProducts);
      return saveProducts;
    } catch (error) {
      throw new BadRequestException('Error saving brands', error);
    }
  }
}
