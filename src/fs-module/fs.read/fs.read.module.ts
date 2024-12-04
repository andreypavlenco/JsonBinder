import { Module } from '@nestjs/common';
import { ReadFileService } from './fs.read.service';

@Module({
  providers: [ReadFileService],
  exports: [ReadFileService],
})
export class ReadFileModule {}
