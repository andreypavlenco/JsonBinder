import { Controller, Post } from '@nestjs/common';
import { ImportFromJsonService } from './import-from-json.service';

@Controller('import')
export class ImportFromJsonController {
  constructor(private readonly importFromJsonservice: ImportFromJsonService) {}

  @Post('brands')
  async importBrands() {
    return await this.importFromJsonservice.importBrands();
  }

  @Post('categories')
  async importCategories() {
    return await this.importFromJsonservice.importCategories();
  }

  @Post('products')
  async importProducts() {
    return this.importFromJsonservice.importProducts();
  }

  @Post('all')
  async importAll() {
    return this.importFromJsonservice.jsonBinder();
  }
}
