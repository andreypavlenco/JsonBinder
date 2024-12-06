import * as path from 'path';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';

export async function saveToFile(
  relativePath: string,
  data: unknown,
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const absolutePath = path.join(process.cwd(), relativePath);
      const writeStream = fs.createWriteStream(absolutePath);

      const jsonData = JSON.stringify(data, null, 2);

      writeStream.on('error', () => {
        reject(new BadRequestException(`Error saving data to ${relativePath}`));
      });

      writeStream.on('finish', () => {
        resolve();
      });

      writeStream.write(jsonData);

      writeStream.end();
    } catch (error) {
      reject(
        new BadRequestException(
          `Unexpected error while saving data to ${relativePath}`,
          error,
        ),
      );
    }
  });
}
