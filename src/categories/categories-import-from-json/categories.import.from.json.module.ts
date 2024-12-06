import { Module } from '@nestjs/common';
import { CategoriesImportFromJsonService } from './categoriesimportfromjson.service';
import { WriteFileModule } from 'src/json-file-service/json-write/json.write.module';
import { ReadFileService } from 'src/json-file-service/json-read/json.read.service';
import { CategoriesModule } from '../categories.module';

@Module({
  imports: [WriteFileModule, ReadFileService, CategoriesModule],
  controllers: [],
  providers: [CategoriesImportFromJsonService],
  exports: [CategoriesImportFromJsonService],
})
export class CategoriesImportFromJsonModule {}
