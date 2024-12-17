import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { BrandsController } from './brands.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
