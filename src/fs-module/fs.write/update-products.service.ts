import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateProductsDto } from 'src/products/dto/create-products-dto';

@Injectable()
export class UpdateProductService {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async updateProductsWithBrandsAndCategories(
    products: CreateProductsDto[],
  ): Promise<CreateProductsDto[]> {
    const brands = await this.brandsService.findAll();
    const categories = await this.categoriesService.findAll();

    return products.map((product) => {
      const updatedProduct = { ...product };

      const brand = brands.find((brand) => brand.name === product.brand);
      if (brand) {
        updatedProduct.brandId = brand.id;
      }

      const productFirstWord = product.title.split(' ')[0];
      const category = categories.find(
        (category) => category.name.split(' ')[0] === productFirstWord,
      );
      if (category) {
        updatedProduct.categoryId = category.id;
      }

      return updatedProduct;
    });
  }
}
