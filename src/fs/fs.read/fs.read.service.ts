import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';

@Injectable()
export class ReadFileService {
  async readFile(dto: string) {
    try {
      const data = await readFile(dto, 'utf8');
      const parseData = JSON.parse(data);
      return parseData;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  }
}
