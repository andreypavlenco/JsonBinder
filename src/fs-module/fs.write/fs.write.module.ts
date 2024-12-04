import { Module } from '@nestjs/common';
import { WriteFileService } from './fs.write.service';
import { UpdateProductService } from './update-products.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';
import { ReadFileModule } from '../fs.read/fs.read.module';

@Module({
  imports: [CategoriesModule, BrandsModule, ReadFileModule],
  providers: [WriteFileService, UpdateProductService],
  exports:[WriteFileService]
})
export class WriteFileModule {}
