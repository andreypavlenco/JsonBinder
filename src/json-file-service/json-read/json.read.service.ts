import * as path from 'path';
import { createReadStream } from 'fs';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ReadFileService {
  async readFile(): Promise<any> {
    const absolutePath = path.join(process.cwd(), 'loading_files/data.json');

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const stream = createReadStream(absolutePath, { encoding: 'utf8' });

      stream.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk));
      });

      stream.on('end', () => {
        try {
          const fileContent = Buffer.concat(chunks).toString();
          const jsonData = JSON.parse(fileContent);
          resolve(jsonData);
        } catch (error) {
          reject(new BadRequestException('Invalid JSON format', error));
        }
      });

      stream.on('error', (error) => {
        reject(new BadRequestException(`Error reading file: ${error.message}`));
      });
    });
  }
}
