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

    const updatedProducts = products.map((product) => {
      const brand = brands.find((b) => b.title === product.brand);
      const productFirstWord = product.title.split(' ')[0];
      const category = categories.find(
        (c) => c.title.split(' ')[0] === productFirstWord,
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
