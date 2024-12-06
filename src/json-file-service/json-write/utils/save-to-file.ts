import { BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs-extra';

export async function saveToFile(
  filePath: string,
  data: unknown,
): Promise<void> {
  try {
    await fs.writeJson(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new BadRequestException(`Error saving data to ${filePath}`, error);
  }
}
