import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { ProductsService } from './products.service';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';

@Module({
  imports: [RepositoryModule, ErrorHandlerModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
