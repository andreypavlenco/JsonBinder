import { MulterModule } from '@nestjs/platform-express';
import { JsonUploadController } from './json-upload.controller';
import { JsonUploadService } from './json-upload.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [MulterModule.register({ dest: './uploading_files' })],
  controllers: [JsonUploadController],
  providers: [JsonUploadService],
})
export class JsonUploadModule {}
