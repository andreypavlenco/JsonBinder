import { BadRequestException, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from 'src/common/errors/internal-server-error-exception';
import { NotFoundException } from 'src/common/errors/not-found-exception';

@Injectable()
export class ErrorHandlerService {
  handleInternalServerError(error: Error, message: string): never {
    throw new InternalServerErrorException(message);
  }

  handleBadRequest(error: Error, message: string): never {
    throw new BadRequestException(message);
  }

  handleNotFound(model: string, condition: string): never {
    const message = `${model} ${condition} not found.`;
    throw new NotFoundException(message);
  }
}
