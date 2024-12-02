import { Module } from '@nestjs/common';
import { ReadFileService } from './fs.read.service';

@Module({
  providers: [
    {
      provide: 'ReadFile',
      useValue: ReadFileService,
    },
  ],
})
export class ReadFileModule {}
