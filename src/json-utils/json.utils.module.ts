import { Module } from '@nestjs/common';
import { ReadJsonService } from './json.read.service';
import { WriteJsonService } from './json.write.service';

@Module({
  providers: [ReadJsonService, WriteJsonService],
  exports: [ReadJsonService, WriteJsonService],
})
export class JsonUtilsModule {}
