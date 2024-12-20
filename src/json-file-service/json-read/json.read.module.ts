import { Module } from '@nestjs/common';
import { ReadFileService } from './json.read.service';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [ReadFileService],
  exports: [ReadFileService],
})
export class ReadFileModule {}
