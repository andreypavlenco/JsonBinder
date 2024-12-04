import { Module } from '@nestjs/common';
import { ReadFileModule } from 'src/fs-module/fs.read/fs.read.module';
import { BrandsService } from './brands.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [ReadFileModule, RepositoryModule],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
