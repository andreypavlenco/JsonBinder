import { Controller, Get } from '@nestjs/common';
import { BrandsCreateService } from './brands.service';

@Controller('brands')
export class BrandsCreateController {
  constructor(private readonly brandsCreateService: BrandsCreateService) {}

  @Get('/save')
  create() {
    return this.brandsCreateService.create();
  }

  @Get('/findAll')
  findAll() {
    return this.brandsCreateService.findAll();
  }
}
