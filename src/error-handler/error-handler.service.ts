import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from 'src/errors/internal-server-error-exception';
import { NotFoundException } from 'src/errors/not-found-exception';

@Injectable()
export class ErrorHandlerService {
  handle(error: any, message: string): never {
    throw error instanceof Error
      ? error
      : new InternalServerErrorException(message);
  }

  handleNotFound(model: string, condition: string): never {
    throw new NotFoundException(`${model} ${condition} not found.`);
  }
}
