import * as path from 'path';
import * as fs from 'fs-extra';

import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ReadFileService {
  async readFile(): Promise<any> {
    try {
      const absolutePath = path.join(process.cwd(), 'loading_files/data.json');
      console.log(`Reading file from: ${absolutePath}`);
      const content = await fs.readJson(absolutePath, { encoding: 'utf8' });
      console.log('File content:', content);
      return content;
    } catch (error) {
      console.error('Error reading file:', error.message);
      throw new BadRequestException('Error reading file', error);
    }
  }
}
