import { Module } from '@nestjs/common';
import { ImportFromJsonController } from './import-from-json.controller';
import { ImportFromJsonService } from './import-from-json.service';
import { BrandsImportFromJsonModule } from 'src/brands/brands-import-from-json/brands-import.module';
import { CategoriesImportFromJsonModule } from 'src/categories/categories-import-from-json/categories-import.module';
import { ProductsImportFromJsonModule } from 'src/products/products-import-from-json/products-import.module';

@Module({
  imports: [
    BrandsImportFromJsonModule,
    CategoriesImportFromJsonModule,
    ProductsImportFromJsonModule,
  ],
  controllers: [ImportFromJsonController],
  providers: [ImportFromJsonService],
})
export class ImportFromJsonModule {}
