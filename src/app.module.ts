import { AppendFileService } from './fs-module/fs.appendFile/appendfile.service';
import { AppendFileModule } from './fs-module/fs.appendFile/appendfile.module';
import { RepositoryModule } from './repositories/repository/repository.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ReadFileModule } from './fs-module/fs.read/fs.read.module';
import { WriteFileModule } from './fs-module/fs.write/fs.write.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    AppendFileModule,
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
