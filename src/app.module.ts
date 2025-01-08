import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { BrandsModule } from './modules/brands/brands.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { ImportFromJsonModule } from './data-import-json/import-from-json.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JsonUtilsModule } from './json-utils/json.utils.module';

@Module({
  imports: [
    ImportFromJsonModule,
    PrismaModule,
    BrandsModule,
    CategoriesModule,
    JsonUtilsModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
