import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { BrandsController } from './brands.controller';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';

@Module({
  imports: [RepositoryModule, ErrorHandlerModule],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
