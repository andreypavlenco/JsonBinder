import { Injectable } from '@nestjs/common';
import { BrandsImportFormJsonService } from './brands/brands-import-from-json/brands-import.service';
import { CategoriesImportFromJsonService } from './categories/categories-import-from-json/categories-import.service';
import { ProductsImportfromJsonService } from './products/products-import-from-json/products-import.service';

@Injectable()
export class AppService {
  constructor(
    private readonly brandsImportFromJson: BrandsImportFormJsonService,
    private readonly categoriesImportFromJson: CategoriesImportFromJsonService,
    private readonly productsImportfromJson: ProductsImportfromJsonService,
  ) {}
  async dataMapper() {
    await this.brandsImportFromJson.createBrandsFromFile();
    await this.categoriesImportFromJson.createCategoriesFromFile();
    await this.productsImportfromJson.createProductsFromFile();
  }
}
