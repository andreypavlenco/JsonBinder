import { BadRequestException, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { ProductsService } from '../../modules/products/products.service';
import { CreateProductsDto } from '../../modules/products/dto/create-products-dto';
import { BrandsService } from 'src/modules/brands/brands.service';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { filterUnique } from 'src/common/utils/filter-unique';
import { ReadJsonService } from 'src/json-utils/json.read.service';
import { WriteJsonService } from 'src/json-utils/json.write.service';

@Injectable()
export class ProductsImportFromJsonService {
  constructor(
    private readonly readJsonService: ReadJsonService,
    private readonly productsService: ProductsService,
    private readonly writeJsonService: WriteJsonService,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async importUniqueProducts(): Promise<Products[]> {
    try {
      const products = await this.productsService.findAll();
      const loadProducts = await this.readJsonService.readJson();
      const uniqueProducts = filterUnique<Products, CreateProductsDto>(
        products,
        loadProducts,
        (item) => item.title,
      );
      if (uniqueProducts.length === 0) {
        throw new BadRequestException(ERROR_MESSAGES.NO_NEW_PRODUCTS);
      }
      const updateProducts =
        await this.updateProductsWithBrandsAndCategoriesJson(uniqueProducts);
      return this.createProducts(updateProducts);
    } catch (error) {
      throw error;
    }
  }

  private async updateProductsWithBrandsAndCategoriesJson(
    dto: CreateProductsDto[],
  ): Promise<CreateProductsDto[]> {
    try {
      const brands = await this.brandsService.findAll();
      const categories = await this.categoriesService.findAll();

      const product = dto.map((product) => {
        if (!product.brand) {
          throw new BadRequestException(
            ERROR_MESSAGES.BRAND_NOT_FOUND + product.title,
          );
        }
        const brand = brands.find((b) => b.title === product.brand);
        if (!brand) {
          throw new BadRequestException(
            ERROR_MESSAGES.BRAND_NOT_FOUND + product.brand,
          );
        }

        const productCategoties = product.title.split(' ')[0];
        const category = categories.find(
          (c) => c.title.split(' ')[0] === productCategoties,
        );
        if (!category) {
          throw new BadRequestException(
            ERROR_MESSAGES.CATEGORY_NOT_FOUND + productCategoties,
          );
        }

        return {
          ...product,
          brandId: brand.id,
          categoryId: category.id,
        };
      });
      return product;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.UPDATE_PRODUCTS);
    }
  }

  private async createProducts(dto: CreateProductsDto[]): Promise<Products[]> {
    try {
      const products = await this.productsService.createMany(dto);
      this.writeJsonService.writeProductsToJson(products);
      return products;
    } catch (error) {
      throw error;
    }
  }
}
