import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ReadFileModule } from 'src/fs-module/fs.read/fs.read.module';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [ReadFileModule, RepositoryModule],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
