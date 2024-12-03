import { Module } from '@nestjs/common';
import { AppendFileService } from './appendfile.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppendFileService],
  exports: [AppendFileService],
})
export class AppendFileModule {}
