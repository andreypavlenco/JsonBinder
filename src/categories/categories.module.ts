import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ReadFileModule } from 'src/json-file-service/json-read/json.read.module';
import { RepositoryModule } from 'src/repositories/repository/repository.module';
import { WriteFileModule } from 'src/json-file-service/json-write/json.write.module';

@Module({
  imports: [
    ReadFileModule,
    RepositoryModule,
    forwardRef(() => WriteFileModule),
  ],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
