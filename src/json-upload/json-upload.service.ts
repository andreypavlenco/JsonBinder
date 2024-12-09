import { Injectable } from '@nestjs/common';

@Injectable()
export class JsonUploadService {
  async uploadJson(file: Express.Multer.File) {
    return {
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
