import { Module } from '@nestjs/common';
import { ReadFileService } from './json.read.service';


@Module({
  providers: [ReadFileService],
  exports: [ReadFileService],
})
export class ReadFileModule {}
