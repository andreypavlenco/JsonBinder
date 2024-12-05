import { Injectable } from '@nestjs/common';
import { BrandsService } from './brands/brands.service';
import { CategoriesService } from './categories/categories.service';
import { WriteFileService } from './fs-module/fs.write/fs.write.service';
import { ProductsService } from './products/products.service';

@Injectable()
export class AppService {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
    private readonly writeFileService: WriteFileService,
    private readonly productsService: ProductsService,
  ) {}
  dataMapper() {
    this.brandsService.createBrandsFromFile();
    this.categoriesService.createCategoriesFromFile();
    this.writeFileService.saveUpdatedProducts();
    return this.productsService.createProductsFromFile();
  }
}
