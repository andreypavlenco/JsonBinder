import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JsonUploadService } from './json-upload.service';

@Controller('json')
export class JsonUploadController {
  constructor(private readonly jsonUploadService: JsonUploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.jsonUploadService.uploadJson(file);
  }
}
