import { Controller, Get } from '@nestjs/common';
import { CategoriesCreateService } from './categories.service';

@Controller('categiries')
export class CategoriesCreateController {
  constructor(
    private readonly categiriesCreateService: CategoriesCreateService,
  ) {}

  @Get('/save')
  create() {
    return this.categiriesCreateService.create();
  }

  @Get('/findAll')
  findAll() {
    return this.categiriesCreateService.findAll();
  }

  @Get('/parse')
  parse() {
    return this.categiriesCreateService.parse();
  }
}
