import { Module } from '@nestjs/common';
import { ImportFromJsonController } from './import-from-json.controller';
import { ImportFromJsonService } from './import-from-json.service';
import { BrandsImportFormJsonService } from './importers/brands-import.service';
import { CategoriesImportFromJsonService } from './importers/categories-import.service';
import { ProductsImportFromJsonService } from './importers/products-import.service';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { BrandsModule } from 'src/modules/brands/brands.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { JsonUtilsModule } from 'src/json-utils/json.utils.module';

@Module({
  imports: [JsonUtilsModule, CategoriesModule, BrandsModule, ProductsModule],
  controllers: [ImportFromJsonController],
  providers: [
    ImportFromJsonService,
    BrandsImportFormJsonService,
    CategoriesImportFromJsonService,
    ProductsImportFromJsonService,
  ],
})
export class ImportFromJsonModule {}
