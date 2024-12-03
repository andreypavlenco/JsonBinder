import { Module } from '@nestjs/common';
import { WriteFileService } from './fs.write.service';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandsService } from 'src/brands/brands.service';
import { ReadFileService } from '../fs.read/fs.read.service';
import { UpdateProductService } from './update-products.service';

@Module({
  imports: [CategoriesService, BrandsService, ReadFileService],
  providers: [WriteFileService, UpdateProductService],
})
export class WriteFileModule {}
