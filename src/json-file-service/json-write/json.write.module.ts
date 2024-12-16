import { Module } from '@nestjs/common';
import { WriteFileService } from './json.write.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';
import { ReadFileModule } from '../json-read/json.read.module';

@Module({
  imports: [CategoriesModule, BrandsModule, ReadFileModule],
  providers: [WriteFileService],
  exports: [WriteFileService],
})
export class WriteFileModule {}
