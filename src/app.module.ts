import { BrandsImportFromJsonModule } from './brands/brands-import-from-json/brands.import.from.json.module';
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

@Module({
  imports: [
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
