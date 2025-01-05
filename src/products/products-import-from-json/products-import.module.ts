import { Module } from '@nestjs/common';
import { ProductsImportfromJsonService } from './products-import.service';
import { ProductsModule } from '../products.module';
import { ReadFileModule } from 'src/json-file-service/json-read/json.read.module';
import { WriteFileModule } from 'src/json-file-service/json-write/json.write.module';
import { BrandsModule } from 'src/brands/brands.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    ReadFileModule,
    ProductsModule,
    WriteFileModule,
    BrandsModule,
    CategoriesModule,
  ],
  providers: [ProductsImportfromJsonService],
  exports: [ProductsImportfromJsonService],
})
export class ProductsImportFromJsonModule {}
