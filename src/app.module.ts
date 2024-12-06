import { ProductsImportFromJsonModule } from './products/products-import-from-json/products-import.module';
import { BrandsImportFromJsonModule } from './brands/brands-import-from-json/brands-import.module';
import { RepositoryModule } from './repositories/repository/repository.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ReadFileModule } from './json-file-service/json-read/json.read.module';
import { ProductsModule } from './products/products.module';
import { WriteFileModule } from './json-file-service/json-write/json.write.module';
import { CategoriesImportFromJsonModule } from './categories/categories-import-from-json/categories-import.module';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
