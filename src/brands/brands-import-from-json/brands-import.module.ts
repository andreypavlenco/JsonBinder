import { Module } from '@nestjs/common';
import { WriteFileModule } from 'src/json-file-service/json-write/json.write.module';
import { BrandsModule } from '../brands.module';
import { ReadFileModule } from 'src/json-file-service/json-read/json.read.module';
import { BrandsImportFormJsonService } from './brands-import.service';

@Module({
  imports: [WriteFileModule, ReadFileModule, BrandsModule],
  providers: [BrandsImportFormJsonService],
  exports: [BrandsImportFormJsonService],
})
export class BrandsImportFromJsonModule {}
