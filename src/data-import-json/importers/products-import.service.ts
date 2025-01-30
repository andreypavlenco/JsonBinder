import { BadRequestException, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { ProductsService } from '../../modules/products/products.service';
import { CreateProductsDto } from '../../modules/products/dto/create-products-dto';
import { BrandsService } from 'src/modules/brands/brands.service';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { ReadJsonService } from 'src/json-utils/json.read.service';
import { WriteJsonService } from 'src/json-utils/json.write.service';
import { filterUnique } from 'src/common/utils';

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
    const [products, loadProducts] = await Promise.all([
      this.productsService.findAll(),
      this.readJsonService.readJson(),
    ]);
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
  }

  private async updateProductsWithBrandsAndCategoriesJson(
    dto: CreateProductsDto[],
  ): Promise<CreateProductsDto[]> {
    const [brands, categories] = await Promise.all([
      this.brandsService.findAll(),
      this.categoriesService.findAll(),
    ]);

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
      const productCategories = product.title.split(' ')[0];
      const category = categories.find(
        (c) => c.title.split(' ')[0] === productCategories,
      );
      if (!category) {
        throw new BadRequestException(
          ERROR_MESSAGES.CATEGORY_NOT_FOUND + productCategories,
        );
      }

      return {
        ...product,
        brandId: brand.id,
        categoryId: category.id,
      };
    });

    return product;
  }

  private async createProducts(dto: CreateProductsDto[]): Promise<Products[]> {
    const products = await this.productsService.createMany(dto);
    await this.writeJsonService.writeProductsToJson(products);
    return products;
  }
}
