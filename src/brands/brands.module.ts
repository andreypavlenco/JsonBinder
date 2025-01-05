import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { ErrorHandlerModule } from 'src/shared/error-handler/error-handler.module';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [RepositoryModule, ErrorHandlerModule],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
