import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ImportFromJsonService } from './import-from-json.service';

@Controller('import')
export class ImportFromJsonController {
  constructor(private readonly importFromJsonService: ImportFromJsonService) {}

  @Post('brands')
  @HttpCode(HttpStatus.CREATED)
  importBrands() {
    return this.importFromJsonService.importBrands();
  }

  @Post('categories')
  @HttpCode(HttpStatus.CREATED)
  importCategories() {
    return this.importFromJsonService.importCategories();
  }

  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  importProducts() {
    return this.importFromJsonService.importProducts();
  }

  @Post('full-import')
  @HttpCode(HttpStatus.CREATED)
  importAll() {
    return this.importFromJsonService.importFullJson();
  }
}
