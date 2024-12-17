import { Module } from '@nestjs/common';
import { BrandsModule } from 'src/brands/brands.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { ImportFromJsonController } from './import-from-json.controller';
import { ImportFromJsonService } from './import-from-json.service';

@Module({
  imports: [BrandsModule, CategoriesModule, ProductsModule],
  controllers: [ImportFromJsonController],
  providers: [ImportFromJsonService],
})
export class ImportFromJsonModule {}
