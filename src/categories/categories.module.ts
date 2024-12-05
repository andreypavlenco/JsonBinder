import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ReadFileModule } from 'src/json-file-service/json-read/json.read.module';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [ReadFileModule, RepositoryModule],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
