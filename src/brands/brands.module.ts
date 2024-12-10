import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule   {}
