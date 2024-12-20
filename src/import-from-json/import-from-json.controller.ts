import { Controller, Post } from '@nestjs/common';
import { ImportFromJsonService } from './import-from-json.service';

@Controller('import')
export class ImportFromJsonController {
  constructor(private readonly importFromJsonservice: ImportFromJsonService) {}

  @Post('brands')
  async importBrands() {
    await this.importFromJsonservice.importBrands();
    return { message: 'Brands imported successfully' };
  }

  @Post('categories')
  async importCategories() {
    await this.importFromJsonservice.importCategories();
    return { message: 'Categories imported successfully' };
  }

  @Post('products')
  async importProducts() {
    await this.importFromJsonservice.importProducts();
    return { message: 'Products imported successfully' };
  }

  @Post('all')
  async importAll() {
    await this.importFromJsonservice.jsonBinder();
    return { message: 'All data imported successfully' };
  }
}
