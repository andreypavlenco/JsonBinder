import * as path from 'path';
import * as fs from 'fs-extra';
import { BadRequestException } from '@nestjs/common';

export async function saveToFile(
  relativePath: string,
  data: unknown,
): Promise<void> {
  try {
    const absolutePath = path.join(process.cwd(), relativePath);
    await fs.writeJson(absolutePath, data, { spaces: 2 });
    console.log(`Data successfully saved to ${absolutePath}`);
  } catch (error) {
    console.error(`Error saving data to file: ${error.message}`);
    throw new BadRequestException(
      `Error saving data to ${relativePath}`,
      error,
    );
  }
}
