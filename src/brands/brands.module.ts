import { BrandsCreateService } from './brands.service';
import { Module } from '@nestjs/common';
import { FileReadModule } from 'src/fs/fs.read/fs.read.module';

@Module({
  imports: [FileReadModule],
  controllers: [],
  providers: [BrandsCreateService],
  exports: [BrandsCreateService],
})
export class BrandsCreateModule {}
