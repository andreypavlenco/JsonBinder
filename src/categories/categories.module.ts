import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesCreateController } from './categories.controller';
import { FileReadModule } from 'src/fs/fs.read/fs.read.module';
import { RepositoryModule } from 'src/repositories/repository/repository.module';

@Module({
  imports: [FileReadModule, RepositoryModule],
  providers: [CategoriesService],
  exports: [],
})
export class CategoriesModule {}
