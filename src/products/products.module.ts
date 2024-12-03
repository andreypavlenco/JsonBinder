import { Module } from '@nestjs/common';
import { ReadFileModule } from 'src/fs-module/fs.read/fs.read.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [ReadFileModule],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
