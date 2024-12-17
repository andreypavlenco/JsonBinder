import { CacheModule } from './cache/cache.module';
import { RedisModule } from './redis/redis.module';
import { ProductsImportFromJsonModule } from './products/products-import-from-json/products-import.module';
import { BrandsImportFromJsonModule } from './brands/brands-import-from-json/brands-import.module';
import { RepositoryModule } from './repositories/repository/repository.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ReadFileModule } from './json-file-service/json-read/json.read.module';
import { ProductsModule } from './products/products.module';
import { WriteFileModule } from './json-file-service/json-write/json.write.module';
import { CategoriesImportFromJsonModule } from './categories/categories-import-from-json/categories-import.module';
import { JsonUploadModule } from './json-upload/json-upload.module';
import { ImportFromJsonModule } from './import-from-json/import-from-json.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ErrorHandlerModule } from './error-handler/error-handler.module';

@Module({
  imports: [
    ErrorHandlerModule,
    ImportFromJsonModule,
    CacheModule,
    RedisModule,
    JsonUploadModule,
    ProductsImportFromJsonModule,
    CategoriesImportFromJsonModule,
    BrandsImportFromJsonModule,
    RepositoryModule,
    PrismaModule,
    BrandsModule,
    CategoriesModule,
    ReadFileModule,
    WriteFileModule,
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
