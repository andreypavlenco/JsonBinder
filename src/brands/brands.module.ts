import { Module } from '@nestjs/common';
import { ReadFileModule } from 'src/json-file-service/json-read/json.read.module';
import { BrandsService } from './brands.service';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { WriteFileModule } from 'src/json-file-service/json-write/json.write.module';

@Module({
  imports: [ReadFileModule, RepositoryModule, WriteFileModule],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
