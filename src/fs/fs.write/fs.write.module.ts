import { Module } from '@nestjs/common';
import { WriteFileController } from '../fs/fs.write/writefile.controller';
import { WriteFileService } from './fs.write.service';
import { CategoriesCreateModule } from 'src/categories-create-data/categories-create.module';
import { BrandsCreateModule } from 'src/brands-create-data/brands-create.module';


@Module({
  imports: [CategoriesCreateModule, BrandsCreateModule, FileReadModule],
  controllers: [WriteFileController],
  providers: [WriteFileService],
})
export class WriteFileModule {}
