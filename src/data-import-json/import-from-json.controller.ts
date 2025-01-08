import { Controller, Post } from '@nestjs/common';
import { ImportFromJsonService } from './import-from-json.service';

@Controller('import')
export class ImportFromJsonController {
  constructor(private readonly importFromJsonservice: ImportFromJsonService) {}

  @Post('brands')
  importBrands() {
    return this.importFromJsonservice.importBrands();
  }

  @Post('categories')
  importCategories() {
    return this.importFromJsonservice.importCategories();
  }

  @Post('products')
  importProducts() {
    return this.importFromJsonservice.importProducts();
  }

  @Post('full-import')
  importAll() {
    return this.importFromJsonservice.importFullJson();
  }
}
