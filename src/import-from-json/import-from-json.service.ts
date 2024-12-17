import { Injectable } from '@nestjs/common';
import { BrandsImportFormJsonService } from 'src/brands/brands-import-from-json/brands-import.service';
import { CategoriesImportFromJsonService } from 'src/categories/categories-import-from-json/categories-import.service';
import { ProductsImportfromJsonService } from 'src/products/products-import-from-json/products-import.service';

@Injectable()
export class ImportFromJsonService {
  constructor(
    private readonly brandsImportFromJson: BrandsImportFormJsonService,
    private readonly categoriesImportFromJson: CategoriesImportFromJsonService,
    private readonly productsImportfromJson: ProductsImportfromJsonService,
  ) {}

  async importBrands() {
    await this.brandsImportFromJson.createBrandsFromFile();
  }

  async importCategories() {
    await this.categoriesImportFromJson.createCategoriesFromFile();
  }

  async importProducts() {
    await this.productsImportfromJson.createProductsFromFile();
  }

  async dataMapper() {
    await this.importBrands();
    await this.importCategories();
    await this.importProducts();
  }
}
