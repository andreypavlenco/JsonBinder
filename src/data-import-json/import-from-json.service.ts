import { Injectable } from '@nestjs/common';
import { BrandsImportFormJsonService } from 'src/data-import-json/importers/brands-import.service';
import { CategoriesImportFromJsonService } from 'src/data-import-json/importers/categories-import.service';
import { ProductsImportFromJsonService } from './importers/products-import.service';

@Injectable()
export class ImportFromJsonService {
  constructor(
    private readonly brandsImportFromJson: BrandsImportFormJsonService,
    private readonly categoriesImportFromJson: CategoriesImportFromJsonService,
    private readonly productsImportfromJson: ProductsImportFromJsonService,
  ) {}

  importBrands() {
    this.brandsImportFromJson.importUniqueBrands();
  }

  importCategories() {
    this.categoriesImportFromJson.importUniqueCategories();
  }

  importProducts() {
    this.productsImportfromJson.importUniqueProducts();
  }

  async importFullJson() {
    await this.importBrands();
    await this.importCategories();
    await this.importProducts();
  }
}
