import { Module } from '@nestjs/common';
import { ReadFileModule } from 'src/fs-module/fs.read/fs.read.module';
import { ProductsController } from './products.controller';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { ProductsService } from './products.service';

@Module({
  imports: [ReadFileModule, RepositoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
