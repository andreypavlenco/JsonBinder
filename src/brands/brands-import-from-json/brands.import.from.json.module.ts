import { Module } from '@nestjs/common';
import { WriteFileModule } from 'src/json-file-service/json-write/json.write.module';
import { ReadFileService } from 'src/json-file-service/json-read/json.read.service';
import { BrandsModule } from '../brands.module';

@Module({
  imports: [WriteFileModule, ReadFileService, BrandsModule],
  controllers: [],
  providers: [BrandsImportFromJsonModule],
})
export class BrandsImportFromJsonModule {}
