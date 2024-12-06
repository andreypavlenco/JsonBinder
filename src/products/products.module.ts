import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { ProductsService } from './products.service';

@Module({
  imports: [RepositoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
