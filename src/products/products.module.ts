import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ErrorHandlerModule } from 'src/shared/error-handler/error-handler.module';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [RepositoryModule, ErrorHandlerModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
