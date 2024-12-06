import { Module } from '@nestjs/common';
import { CategoriesImportFromJsonService } from './categories-import.service';
import { WriteFileModule } from 'src/json-file-service/json-write/json.write.module';
import { CategoriesModule } from '../categories.module';
import { ReadFileModule } from 'src/json-file-service/json-read/json.read.module';

@Module({
  imports: [WriteFileModule, ReadFileModule, CategoriesModule],
  providers: [CategoriesImportFromJsonService],
  exports: [CategoriesImportFromJsonService],
})
export class CategoriesImportFromJsonModule {}
