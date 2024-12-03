import { PrismaModule } from 'prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReadFileModule } from 'src/fs-module/fs.read/fs.read.module';
import { BrandsService } from './brands.service';

@Module({
  imports: [ReadFileModule],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
