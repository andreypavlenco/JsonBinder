import { Controller, Get } from '@nestjs/common';
import { ProductsCreateService } from './products-create.service';

@Controller('save/pg/products')
export class ProductsCreateController {
  constructor(private readonly productsCreateService: ProductsCreateService) {}

  @Get()
  create() {
    return this.productsCreateService.create();
  }
}
