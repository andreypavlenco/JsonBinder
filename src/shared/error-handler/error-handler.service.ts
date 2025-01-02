import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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
